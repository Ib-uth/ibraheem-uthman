import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { SplitText } from 'gsap/SplitText';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const isClient = typeof window !== 'undefined';

if (isClient) {
	gsap.registerPlugin(ScrollTrigger, Draggable, SplitText, InertiaPlugin);
}

export function gsapReady(): Promise<void> {
	return Promise.resolve();
}

export { gsap, ScrollTrigger, Draggable, SplitText };

export function getSplitText() {
	return isClient ? SplitText : null;
}

export function markIxReady() {
	document.documentElement.classList.add('w-mod-ix3');
}
