import type { Action } from 'svelte/action';
import { gsap, ScrollTrigger, SplitText, markIxReady } from '$lib/gsap/register';

type SplitResult = {
	chars?: Element[];
	lines?: Element[];
	revert: () => void;
};

type ActionCleanup = {
	destroy: () => void;
};

function hideNode(node: HTMLElement) {
	node.style.visibility = 'hidden';
}

function showNode(node: HTMLElement) {
	node.style.visibility = '';
}

function waitForFonts(): Promise<void> {
	if (typeof document === 'undefined' || !document.fonts?.ready) {
		return Promise.resolve();
	}
	return document.fonts.ready.then(() => undefined);
}

function createSplit(node: HTMLElement, type: 'chars' | 'lines'): SplitResult | null {
	if (typeof window === 'undefined') return null;

	return SplitText.create(node, {
		type,
		mask: type
	}) as SplitResult;
}

function charsScroll(node: HTMLElement): ActionCleanup {
	const split = createSplit(node, 'chars');
	if (!split?.chars) {
		showNode(node);
		markIxReady();
		return { destroy: () => {} };
	}

	gsap.set(split.chars, { y: '100%' });
	showNode(node);
	markIxReady();

	const tween = gsap.to(split.chars, {
		y: '0%',
		duration: 0.7,
		stagger: 0.05,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start: 'top 80%',
			once: true
		}
	});

	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			split.revert();
		}
	};
}

function charsLoad(node: HTMLElement): ActionCleanup {
	const split = createSplit(node, 'chars');
	if (!split?.chars) {
		showNode(node);
		markIxReady();
		return { destroy: () => {} };
	}

	gsap.set(split.chars, { y: '100%' });
	showNode(node);
	markIxReady();

	const tween = gsap.to(split.chars, {
		y: '0%',
		duration: 0.5,
		stagger: 0.05,
		ease: 'power2.out'
	});

	return {
		destroy: () => {
			tween.kill();
			split.revert();
		}
	};
}

function linesScroll(node: HTMLElement): ActionCleanup {
	const split = createSplit(node, 'lines');
	if (!split?.lines) {
		showNode(node);
		markIxReady();
		return { destroy: () => {} };
	}

	gsap.set(split.lines, { y: '155%', rotation: 3 });
	showNode(node);
	markIxReady();

	const tween = gsap.to(split.lines, {
		y: '0%',
		rotation: 0,
		duration: 0.7,
		stagger: 0.1,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: node,
			start: 'top center',
			once: true
		}
	});

	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			split.revert();
		}
	};
}

function linesLoad(node: HTMLElement): ActionCleanup {
	const split = createSplit(node, 'lines');
	if (!split?.lines) {
		showNode(node);
		markIxReady();
		return { destroy: () => {} };
	}

	gsap.set(split.lines, { y: '155%', rotation: 3 });
	showNode(node);
	markIxReady();

	const tween = gsap.to(split.lines, {
		y: '0%',
		rotation: 0,
		duration: 0.7,
		stagger: 0.1,
		ease: 'power2.out'
	});

	return {
		destroy: () => {
			tween.kill();
			split.revert();
		}
	};
}

function withFontReady(run: () => ActionCleanup): ActionCleanup {
	let innerCleanup: (() => void) | undefined;
	let cancelled = false;

	void waitForFonts().then(() => {
		if (cancelled) return;
		innerCleanup = run().destroy;
	});

	return {
		destroy: () => {
			cancelled = true;
			innerCleanup?.();
		}
	};
}

function createAnimatedAction(run: (node: HTMLElement) => ActionCleanup): Action<HTMLElement> {
	return (node) => {
		hideNode(node);
		const fontCleanup = withFontReady(() => run(node));

		return {
			destroy: () => {
				fontCleanup.destroy();
				showNode(node);
			}
		};
	};
}

export const animateChars = createAnimatedAction(charsScroll);
export const animateCharsLoad = createAnimatedAction(charsLoad);
export const animateLines = createAnimatedAction(linesScroll);
export const animateLinesLoad = createAnimatedAction(linesLoad);

export function initFooterLinkBlur() {
	const links = document.querySelectorAll<HTMLElement>('.link-footer');
	const cleanups: (() => void)[] = [];

	links.forEach((link) => {
		const onEnter = () => {
			links.forEach((other) => {
				if (other !== link) gsap.to(other, { filter: 'blur(2px)', duration: 0.3 });
			});
		};
		const onLeave = () => {
			links.forEach((other) => {
				gsap.to(other, { filter: 'blur(0px)', duration: 0.3 });
			});
		};
		link.addEventListener('mouseenter', onEnter);
		link.addEventListener('mouseleave', onLeave);
		cleanups.push(() => {
			link.removeEventListener('mouseenter', onEnter);
			link.removeEventListener('mouseleave', onLeave);
		});
	});

	return () => cleanups.forEach((fn) => fn());
}

export function initFooterMarquee() {
	const mar = document.querySelector<HTMLElement>('.marquee-footer');
	if (!mar) return () => {};

	gsap.set(mar, { x: '-100%' });
	const tween = gsap.to(mar, {
		x: '0%',
		duration: 25,
		ease: 'none',
		repeat: -1,
		onRepeat: () => gsap.set(mar, { x: '-100%' })
	});

	return () => tween.kill();
}
