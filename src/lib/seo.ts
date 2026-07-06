import type { Post } from '$lib/data/posts';
import type { Project } from '$lib/data/projects';
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_OG_IMAGE,
	DEFAULT_OG_IMAGE_ALT,
	DEFAULT_OG_IMAGE_HEIGHT,
	DEFAULT_OG_IMAGE_WIDTH,
	SITE_EMAIL,
	SITE_LOCATION,
	SITE_NAME,
	SITE_TAGLINE,
	SITE_URL,
	SOCIAL_PROFILES
} from '$lib/constants/site';

export type OgType = 'website' | 'article';

export type SeoData = {
	/** Page title without site suffix — formatted automatically unless `rawTitle` is set. */
	title: string;
	description?: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	/** Pathname, e.g. `/about` or `/work/argon-intelligence` */
	path?: string;
	type?: OgType;
	noindex?: boolean;
	/** Skip `| Site Name` suffix when the title is already complete. */
	rawTitle?: boolean;
	jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function formatPageTitle(title: string, rawTitle = false): string {
	if (rawTitle || title.endsWith(`| ${SITE_NAME}`)) return title;
	return `${title} | ${SITE_NAME}`;
}

export function absoluteUrl(pathOrUrl: string): string {
	if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
		return pathOrUrl;
	}
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${SITE_URL.replace(/\/$/, '')}${path}`;
}

export function resolveOgImage(image?: string): string {
	if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
	return absoluteUrl(image);
}

export function ogImageMimeType(url: string): string {
	const lower = url.toLowerCase();
	if (lower.endsWith('.png')) return 'image/png';
	if (lower.endsWith('.webp')) return 'image/webp';
	if (lower.endsWith('.gif')) return 'image/gif';
	return 'image/jpeg';
}

export function buildCanonicalUrl(path = '/'): string {
	if (path === '/' || path === '') return SITE_URL.replace(/\/$/, '');
	return absoluteUrl(path);
}

export function truncateDescription(text: string, max = 155): string {
	const trimmed = text.trim();
	if (trimmed.length <= max) return trimmed;
	return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export function buildSeo(data: SeoData) {
	const description = truncateDescription(data.description ?? DEFAULT_DESCRIPTION);
	const canonical = buildCanonicalUrl(data.path ?? '/');
	const ogImage = resolveOgImage(data.image);
	const usesDefaultImage = !data.image;
	const pageTitle = formatPageTitle(data.title, data.rawTitle);

	return {
		title: pageTitle,
		description,
		canonical,
		ogImage,
		ogImageAlt: data.imageAlt ?? (usesDefaultImage ? DEFAULT_OG_IMAGE_ALT : data.title),
		ogImageWidth: data.imageWidth ?? (usesDefaultImage ? DEFAULT_OG_IMAGE_WIDTH : undefined),
		ogImageHeight: data.imageHeight ?? (usesDefaultImage ? DEFAULT_OG_IMAGE_HEIGHT : undefined),
		ogImageType: ogImageMimeType(ogImage),
		type: data.type ?? 'website',
		noindex: data.noindex ?? false
	};
}

export const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': `${SITE_URL.replace(/\/$/, '')}/#person`,
	name: SITE_NAME,
	givenName: 'Ibraheem',
	familyName: 'Uthman',
	jobTitle: SITE_TAGLINE,
	description: DEFAULT_DESCRIPTION,
	email: SITE_EMAIL,
	url: SITE_URL,
	image: absoluteUrl(DEFAULT_OG_IMAGE),
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Abuja',
		addressCountry: 'NG'
	},
	knowsAbout: [
		'Software Engineering',
		'Security Engineering',
		'DevSecOps',
		'Detection Engineering',
		'Cloud Security',
		'Full-Stack Development'
	],
	sameAs: [...SOCIAL_PROFILES]
};

export const websiteJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE_URL.replace(/\/$/, '')}/#website`,
	name: SITE_NAME,
	description: DEFAULT_DESCRIPTION,
	url: SITE_URL,
	inLanguage: 'en',
	publisher: { '@id': `${SITE_URL.replace(/\/$/, '')}/#person` },
	author: { '@id': `${SITE_URL.replace(/\/$/, '')}/#person` }
};

export const professionalServiceJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	name: `${SITE_NAME} — ${SITE_TAGLINE}`,
	description: DEFAULT_DESCRIPTION,
	url: SITE_URL,
	email: SITE_EMAIL,
	image: absoluteUrl(DEFAULT_OG_IMAGE),
	areaServed: SITE_LOCATION,
	founder: { '@id': `${SITE_URL.replace(/\/$/, '')}/#person` },
	sameAs: [...SOCIAL_PROFILES]
};

export function breadcrumbJsonLd(
	items: { name: string; path: string }[]
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: buildCanonicalUrl(item.path)
		}))
	};
}

export function projectJsonLd(project: Project, path: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.title,
		description: project.description,
		...(project.image ? { image: absoluteUrl(project.image.image) } : {}),
		url: buildCanonicalUrl(path),
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL
		},
		dateCreated: project.year
	};
}

export function articleJsonLd(post: Post, path: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.description,
		image: absoluteUrl(post.image),
		url: buildCanonicalUrl(path),
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL
		},
		datePublished: post.year,
		mainEntityOfPage: buildCanonicalUrl(path)
	};
}

export function seoForHome(): SeoData {
	return {
		title: SITE_TAGLINE,
		description:
			'Ibraheem Uthman builds full-stack systems, secure APIs, and detection pipelines from Abuja, Nigeria. Software engineering, DevSecOps, and cloud security.',
		path: '/',
		jsonLd: [personJsonLd, websiteJsonLd, professionalServiceJsonLd]
	};
}

export function seoForAbout(): SeoData {
	return {
		title: 'About',
		description:
			'About Ibraheem Uthman — software and security engineer at Quodel Technologies. Full-stack engineering, detection engineering, and cloud security from Abuja, Nigeria.',
		path: '/about',
		jsonLd: breadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'About', path: '/about' }
		])
	};
}

export function seoForServices(): SeoData {
	return {
		title: 'Services',
		description:
			'Software and security services by Ibraheem Uthman — full-stack engineering, API design, DevSecOps, detection engineering, cloud security, and penetration testing.',
		path: '/services',
		jsonLd: breadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Services', path: '/services' }
		])
	};
}

export function seoForWork(): SeoData {
	return {
		title: 'Projects',
		description:
			'Selected software and security projects by Ibraheem Uthman — analytics platforms, literary journals, secure CI/CD, and cloud hardening.',
		path: '/work',
		jsonLd: breadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Projects', path: '/work' }
		])
	};
}

export function seoForBlog(): SeoData {
	return {
		title: 'Blog',
		description:
			'Writing by Ibraheem Uthman on software design, payment safety, detection engineering, and shipping secure CI/CD without slowing teams.',
		path: '/blog',
		jsonLd: breadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Blog', path: '/blog' }
		])
	};
}

export function seoForContact(): SeoData {
	return {
		title: 'Contact',
		description:
			'Contact Ibraheem Uthman for software engineering, security consulting, or DevSecOps work. Based in Abuja, Nigeria.',
		path: '/contact',
		jsonLd: breadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Contact', path: '/contact' }
		])
	};
}

export function seoForProject(project: Project): SeoData {
	const path = `/work/${project.slug}`;
	return {
		title: `${project.title} | Projects`,
		description: project.description,
		image: project.image?.image,
		imageAlt: `${project.title} — project by Ibraheem Uthman`,
		path,
		type: 'article',
		jsonLd: [
			projectJsonLd(project, path),
			breadcrumbJsonLd([
				{ name: 'Home', path: '/' },
				{ name: 'Projects', path: '/work' },
				{ name: project.title, path }
			])
		]
	};
}

export function seoForPost(post: Post): SeoData {
	const path = `/blog/${post.slug}`;
	return {
		title: post.title,
		description: post.description,
		image: post.image,
		imageAlt: `${post.title} — article by Ibraheem Uthman`,
		path,
		type: 'article',
		jsonLd: [
			articleJsonLd(post, path),
			breadcrumbJsonLd([
				{ name: 'Home', path: '/' },
				{ name: 'Blog', path: '/blog' },
				{ name: post.title, path }
			])
		]
	};
}

export function seoForNotFound(): SeoData {
	return {
		title: 'Page Not Found',
		description: 'This page does not exist. Head back home or get in touch with Ibraheem Uthman.',
		path: '/404',
		noindex: true
	};
}

/** Static routes included in sitemap.xml */
export const SITEMAP_STATIC_PATHS = [
	'/',
	'/about',
	'/services',
	'/work',
	'/blog',
	'/contact'
] as const;

export const SITEMAP_PRIORITY: Record<string, number> = {
	'/': 1.0,
	'/about': 0.9,
	'/services': 0.9,
	'/work': 0.9,
	'/blog': 0.8,
	'/contact': 0.8
};

export const SITEMAP_CHANGEFREQ: Record<string, string> = {
	'/': 'weekly',
	'/about': 'monthly',
	'/services': 'monthly',
	'/work': 'weekly',
	'/blog': 'weekly',
	'/contact': 'yearly'
};
