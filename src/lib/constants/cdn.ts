export const CDN =
	'https://cdn.prod.website-files.com/6851b535e97a9e6a0a0a70e4';

export const CDN_WORK =
	'https://cdn.prod.website-files.com/6851b535e97a9e6a0a0a70ff';

export const img = (path: string) => `${CDN}/${path}`;
export const workImg = (path: string) => `${CDN_WORK}/${path}`;
