/** Canonical site URL — override via PUBLIC_SITE_URL env at build time. */
export const SITE_URL =
	(typeof import.meta.env !== 'undefined' && import.meta.env.PUBLIC_SITE_URL) ||
	'https://www.ibraheemuthman.com';

export const SITE_NAME = 'Ibraheem Uthman';

export const SITE_EMAIL = 'hello@ibraheemuthman.com';

export const DEFAULT_DESCRIPTION =
	'Software and security engineer in Abuja, Nigeria. Full-stack engineering, DevSecOps, detection engineering, and cloud security.';

export const DEFAULT_OG_IMAGE = '/images/ibraheem-uthman-og.jpg';

export const DEFAULT_OG_IMAGE_WIDTH = 2355;
export const DEFAULT_OG_IMAGE_HEIGHT = 2491;
export const DEFAULT_OG_IMAGE_ALT =
	'Portrait of Ibraheem Uthman, software and security engineer based in Abuja, Nigeria';

export const DEFAULT_SOCIAL_DESCRIPTION =
	'Full-stack and security engineer in Abuja. Systems, secure APIs, detection pipelines, and DevSecOps.';

/** Max length for `<meta name="description">` (search snippets). */
export const META_DESCRIPTION_MAX = 155;

/** Max length for og:description / twitter:description (social previews). */
export const SOCIAL_DESCRIPTION_MAX = 120;

export const SITE_TAGLINE = 'Software & Security Engineer';

export const SITE_LOCATION = 'Abuja, Nigeria';

export const TWITTER_HANDLE = '@ibraheemuthman';

export const THEME_COLOR = '#12181f';

export const SOCIAL_PROFILES = [
	'https://github.com/ibraheemuthman',
	'https://linkedin.com/in/ibraheemuthman',
	'https://twitter.com/ibraheemuthman',
	'https://instagram.com/ibraheemuthman'
] as const;
