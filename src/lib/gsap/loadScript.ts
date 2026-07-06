const loaded = new Set<string>();

export function loadScript(src: string): Promise<void> {
	if (loaded.has(src)) return Promise.resolve();
	if (typeof document === 'undefined') return Promise.resolve();

	const existing = document.querySelector(`script[src="${src}"]`);
	if (existing) {
		loaded.add(src);
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = () => {
			loaded.add(src);
			resolve();
		};
		script.onerror = () => reject(new Error(`Failed to load ${src}`));
		document.head.appendChild(script);
	});
}
