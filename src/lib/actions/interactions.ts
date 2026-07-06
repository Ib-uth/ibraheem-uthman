import type { Action } from 'svelte/action';
import { gsap } from '$lib/gsap/register';

export const tagParallax: Action<HTMLElement> = (node) => {
	const first = node.querySelector<HTMLElement>('.first-tag');
	const second = node.querySelector<HTMLElement>('.second-tag');
	const third = node.querySelector<HTMLElement>('.third-tag');
	const fourth = node.querySelector<HTMLElement>('.fourth-tag');

	const tags = [
		{ el: first, x: [2, -2], skew: [5, -5] },
		{ el: second, x: [-20, 20], skew: [-5, 5] },
		{ el: third, x: [-20, 20], skew: [-5, 5] },
		{ el: fourth, x: [20, -20], skew: [5, -5] }
	].filter((t) => t.el) as { el: HTMLElement; x: [number, number]; skew: [number, number] }[];

	const movers = tags.map(({ el, x, skew }) => ({
		moveX: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }),
		moveSkew: gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3.out' }),
		x,
		skew
	}));

	const onMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const relX = (e.clientX - rect.left) / rect.width;
		movers.forEach(({ moveX, moveSkew, x, skew }) => {
			moveX(`${gsap.utils.interpolate(x[0], x[1], relX)}%`);
			moveSkew(`${gsap.utils.interpolate(skew[0], skew[1], relX)}deg`);
		});
	};

	node.addEventListener('mousemove', onMove);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
		}
	};
};

export const fadeInScroll: Action<HTMLElement> = (node) => {
	gsap.set(node, { opacity: 0 });

	const tween = gsap.to(node, {
		opacity: 1,
		duration: 0.6,
		delay: 0.1,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start: 'top 90%',
			once: true
		}
	});

	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
};

type ServiceMarqueeItem = {
	marquee: HTMLElement;
	image: HTMLElement;
	moveX: gsap.QuickToFunc;
	moveY: gsap.QuickToFunc;
	rotate: gsap.QuickToFunc;
};

const hideServiceImage = (item: ServiceMarqueeItem) => {
	gsap.killTweensOf(item.image);
	gsap.to(item.image, {
		scaleX: 0,
		scaleY: 0,
		opacity: 0,
		duration: 0.3,
		ease: 'power2.out',
		overwrite: true
	});
	gsap.set(item.image, { x: 0, y: 0, rotation: 0 });
};

const showServiceImage = (item: ServiceMarqueeItem) => {
	gsap.killTweensOf(item.image);
	gsap.set(item.image, { opacity: 1 });
	gsap.to(item.image, {
		scaleX: 1,
		scaleY: 1,
		duration: 0.5,
		ease: 'back.out(1.7)',
		overwrite: true
	});
};

const getServiceRowIndexAtPoint = (
	items: ServiceMarqueeItem[],
	clientX: number,
	clientY: number
): number | null => {
	for (let i = items.length - 1; i >= 0; i--) {
		const rect = items[i].marquee.getBoundingClientRect();
		if (
			clientX >= rect.left &&
			clientX <= rect.right &&
			clientY >= rect.top &&
			clientY <= rect.bottom
		) {
			return i;
		}
	}
	return null;
};

export const serviceMarqueeSection: Action<HTMLElement> = (node) => {
	const marquees = [...node.querySelectorAll<HTMLElement>('.master-marquee')];
	if (marquees.length === 0) return { destroy: () => {} };

	const items: ServiceMarqueeItem[] = marquees.flatMap((marquee) => {
		const image = marquee.querySelector<HTMLElement>('.image-wrap-service');
		if (!image) return [];

		gsap.set(image, {
			scaleX: 0,
			scaleY: 0,
			opacity: 0,
			transformOrigin: 'center center'
		});

		return [
			{
				marquee,
				image,
				moveX: gsap.quickTo(image, 'x', { duration: 0.5, ease: 'power3.out' }),
				moveY: gsap.quickTo(image, 'y', { duration: 0.5, ease: 'power3.out' }),
				rotate: gsap.quickTo(image, 'rotation', { duration: 0.5, ease: 'power3.out' })
			}
		];
	});

	if (items.length === 0) return { destroy: () => {} };

	let activeIndex: number | null = null;

	const setActive = (index: number | null) => {
		if (index === activeIndex) return;

		if (activeIndex !== null) {
			hideServiceImage(items[activeIndex]);
			items[activeIndex].marquee.style.zIndex = '';
		}

		activeIndex = index;

		if (index !== null) {
			items[index].marquee.style.zIndex = '5';
			showServiceImage(items[index]);
		}
	};

	const updateParallax = (clientX: number, clientY: number, index: number) => {
		const item = items[index];
		const rect = item.marquee.getBoundingClientRect();
		const relX = (clientX - rect.left) / rect.width;
		const relY = (clientY - rect.top) / rect.height;
		item.moveX(`${gsap.utils.interpolate(-100, 100, relX)}%`);
		item.rotate(gsap.utils.interpolate(-5, 5, relX));
		item.moveY(`${gsap.utils.interpolate(-20, 20, relY)}%`);
	};

	const onMove = (e: MouseEvent) => {
		const index = getServiceRowIndexAtPoint(items, e.clientX, e.clientY);
		setActive(index);
		if (index !== null) {
			updateParallax(e.clientX, e.clientY, index);
		}
	};

	const onLeave = () => {
		setActive(null);
	};

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy: () => {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
			items.forEach((item, index) => {
				hideServiceImage(item);
				item.marquee.style.zIndex = '';
			});
		}
	};
};

export const awardsHover: Action<HTMLElement> = (node) => {
	const items = [...node.querySelectorAll<HTMLElement>('.awards-item')]
		.map((item) => {
			const inner = item.querySelector<HTMLElement>('.awards-item-inner');
			const image = item.querySelector<HTMLElement>('.awards-image');
			if (!inner || !image) return null;

			const line = item.querySelector<HTMLElement>('.awards-bottom-line');
			if (line) gsap.set(line, { width: '0%' });
			gsap.set(image, {
				scaleX: 0,
				scaleY: 0,
				opacity: 0,
				transformOrigin: 'center center'
			});

			return { inner, line, image };
		})
		.filter((item): item is NonNullable<typeof item> => item !== null);

	if (items.length === 0) return { destroy: () => {} };

	let activeIndex: number | null = null;

	const hideImage = (item: (typeof items)[number]) => {
		gsap.killTweensOf(item.image);
		gsap.to(item.image, {
			scaleX: 0,
			scaleY: 0,
			opacity: 0,
			duration: 0.3,
			ease: 'power2.out',
			overwrite: true
		});
		if (item.line) {
			gsap.to(item.line, { width: '0%', duration: 0.4, ease: 'power2.out' });
		}
	};

	const showImage = (item: (typeof items)[number]) => {
		gsap.killTweensOf(item.image);
		gsap.set(item.image, { opacity: 1 });
		gsap.to(item.image, {
			scaleX: 1,
			scaleY: 1,
			duration: 0.5,
			ease: 'back.out(1.7)',
			overwrite: true
		});
		if (item.line) {
			gsap.to(item.line, { width: '100%', duration: 0.5, ease: 'power2.out' });
		}
	};

	const getIndexAtPoint = (clientX: number, clientY: number): number | null => {
		for (let i = items.length - 1; i >= 0; i--) {
			const rect = items[i].inner.getBoundingClientRect();
			if (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			) {
				return i;
			}
		}
		return null;
	};

	const setActive = (index: number | null) => {
		if (index === activeIndex) return;

		if (activeIndex !== null) {
			hideImage(items[activeIndex]);
		}

		activeIndex = index;

		if (index !== null) {
			showImage(items[index]);
		}
	};

	const onMove = (e: MouseEvent) => {
		setActive(getIndexAtPoint(e.clientX, e.clientY));
	};

	const onLeave = () => {
		setActive(null);
	};

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy: () => {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
			items.forEach((item) => hideImage(item));
		}
	};
};

export const aboutHeroParallax: Action<HTMLElement> = (node) => {
	const image = node.querySelector<HTMLElement>('.about-main-image');
	if (!image) return { destroy: () => {} };

	const moveX = gsap.quickTo(image, 'x', { duration: 0.5, ease: 'power3.out' });
	const moveY = gsap.quickTo(image, 'y', { duration: 0.5, ease: 'power3.out' });
	const rotate = gsap.quickTo(image, 'rotation', { duration: 0.5, ease: 'power3.out' });

	const onMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const relX = (e.clientX - rect.left) / rect.width;
		const relY = (e.clientY - rect.top) / rect.height;
		moveX(`${gsap.utils.interpolate(-50, 50, relX)}%`);
		moveY(`${gsap.utils.interpolate(-50, 50, relY)}%`);
		rotate(gsap.utils.interpolate(-5, 5, relX));
	};

	node.addEventListener('mousemove', onMove);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
		}
	};
};
