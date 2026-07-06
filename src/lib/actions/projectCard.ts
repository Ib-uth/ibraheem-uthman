import type { Action } from 'svelte/action';
import { gsap } from '$lib/gsap/register';

export const projectCard: Action<HTMLElement> = (node) => {
	const image = node.querySelector<HTMLElement>('.liquid-image');
	const cursorMaster = node.querySelector<HTMLElement>('.cursor-master');
	const cursor = node.querySelector<HTMLElement>('.cursor');

	if (!image || !cursorMaster || !cursor) return { destroy: () => {} };

	gsap.set(cursor, { scale: 0 });

	const moveX = gsap.quickTo(image, 'x', { duration: 0.5, ease: 'power3.out' });
	const moveY = gsap.quickTo(image, 'y', { duration: 0.5, ease: 'power3.out' });
	const cursorX = gsap.quickTo(cursorMaster, 'x', { duration: 0.5, ease: 'power3.out' });
	const cursorY = gsap.quickTo(cursorMaster, 'y', { duration: 0.5, ease: 'power3.out' });

	const onMove = (e: MouseEvent) => {
		const rect = node.getBoundingClientRect();
		const relX = (e.clientX - rect.left) / rect.width;
		const relY = (e.clientY - rect.top) / rect.height;
		const imgX = gsap.utils.interpolate(5, -5, relX);
		const imgY = gsap.utils.interpolate(-5, 5, relY);
		const curX = gsap.utils.interpolate(-50, 50, relX);
		const curY = gsap.utils.interpolate(-50, 50, relY);
		moveX(`${imgX}%`);
		moveY(`${imgY}%`);
		cursorX(`${curX}%`);
		cursorY(`${curY}%`);
	};

	const onEnter = () => {
		gsap.to(cursor, { scale: 1, duration: 1, ease: 'circ.out' });
	};

	const onLeave = () => {
		gsap.to(cursor, { scale: 0, duration: 0.7, ease: 'circ.out' });
		gsap.to(image, { x: '0%', y: '0%', duration: 0.5 });
	};

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseenter', onEnter);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseenter', onEnter);
			node.removeEventListener('mouseleave', onLeave);
		}
	};
};
