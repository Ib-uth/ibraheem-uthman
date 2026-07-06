/** Canonical site URL — override via PUBLIC_SITE_URL env at build time. */
export const SITE_URL =
	(typeof import.meta.env !== 'undefined' && import.meta.env.PUBLIC_SITE_URL) ||
	'https://ibraheemuthman.com';

export const SITE_NAME = 'Ibraheem Uthman';

export const SITE_EMAIL = 'hello@ibraheemuthman.com';

export const DEFAULT_DESCRIPTION =
	'Software and security engineer in Abuja, Nigeria. Full-stack engineering, DevSecOps, detection engineering, and cloud security.';

export const DEFAULT_OG_IMAGE = '/images/og-default.webp';

export const THEME_COLOR = '#12181f';

export const SOCIAL_PROFILES = [
	'https://github.com/ibraheemuthman',
	'https://linkedin.com/in/ibraheemuthman',
	'https://twitter.com/ibraheemuthman',
	'https://instagram.com/ibraheemuthman'
] as const;
