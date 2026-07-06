import type { Action } from 'svelte/action';
import { gsap } from '$lib/gsap/register';

type MarqueeOptions = {
	direction?: 'left' | 'right';
	duration?: number;
};

export const marquee: Action<HTMLElement, MarqueeOptions> = (node, options = {}) => {
	const direction = options.direction ?? 'left';
	const duration = options.duration ?? 25;

	const startX = direction === 'right' ? '-100%' : '0%';
	const endX = direction === 'right' ? '0%' : '-100%';

	gsap.set(node, { x: startX });

	const tween = gsap.to(node, {
		x: endX,
		duration,
		ease: 'none',
		repeat: -1,
		onRepeat: () => gsap.set(node, { x: startX })
	});

	return {
		update(newOptions: MarqueeOptions = {}) {
			tween.kill();
			const dir = newOptions.direction ?? direction;
			const dur = newOptions.duration ?? duration;
			const sX = dir === 'right' ? '-100%' : '0%';
			const eX = dir === 'right' ? '0%' : '-100%';
			gsap.set(node, { x: sX });
			gsap.to(node, {
				x: eX,
				duration: dur,
				ease: 'none',
				repeat: -1,
				onRepeat: () => gsap.set(node, { x: sX })
			});
		},
		destroy() {
			tween.kill();
		}
	};
};
