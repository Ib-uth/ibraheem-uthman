import type { Action } from 'svelte/action';

export const splineBackground: Action<HTMLElement, string> = (node, url) => {
	let app: { dispose?: () => void } | undefined;

	const load = async () => {
		if (typeof window === 'undefined' || !url) return;

		const canvas = node.querySelector('canvas');
		if (!canvas) return;

		try {
			const { Application } = await import('@splinetool/runtime');
			app = new Application(canvas);
			await app.load(url);
		} catch (error) {
			console.warn('Spline background failed to load:', error);
		}
	};

	void load();

	return {
		destroy() {
			app?.dispose?.();
		}
	};
};
