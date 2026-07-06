import type { Post } from '$lib/data/posts';
import type { Project } from '$lib/data/projects';
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_OG_IMAGE,
	SITE_EMAIL,
	SITE_NAME,
	SITE_URL,
	SOCIAL_PROFILES
} from '$lib/constants/site';

export type OgType = 'website' | 'article';

export type SeoData = {
	/** Page title without site suffix — formatted automatically unless `rawTitle` is set. */
	title: string;
	description?: string;
	image?: string;
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
	const pageTitle = formatPageTitle(data.title, data.rawTitle);

	return {
		title: pageTitle,
		description,
		canonical,
		ogImage,
		type: data.type ?? 'website',
		noindex: data.noindex ?? false
	};
}

export const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: SITE_NAME,
	jobTitle: 'Software & Security Engineer',
	email: SITE_EMAIL,
	url: SITE_URL,
	sameAs: [...SOCIAL_PROFILES]
};

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
		image: post.image,
		url: buildCanonicalUrl(path),
		author: {
			'@type': 'Person',
			name: SITE_NAME,
			url: SITE_URL
		},
		datePublished: post.year
	};
}

export function seoForHome(): SeoData {
	return {
		title: 'Software & Security Engineer',
		description:
			'Ibraheem Uthman builds full-stack systems, secure APIs, and detection pipelines from Abuja, Nigeria.',
		path: '/'
	};
}

export function seoForAbout(): SeoData {
	return {
		title: 'About',
		description:
			'Software and security engineer at Quodel Technologies. Full-stack engineering, detection engineering, and cloud security from Abuja, Nigeria.',
		path: '/about'
	};
}

export function seoForServices(): SeoData {
	return {
		title: 'Services',
		description:
			'Full-stack engineering, API design, DevSecOps, detection engineering, cloud security, and penetration testing.',
		path: '/services'
	};
}

export function seoForWork(): SeoData {
	return {
		title: 'Projects',
		description:
			'Selected software and security work — analytics platforms, payment systems, secure CI/CD, and cloud hardening.',
		path: '/work'
	};
}

export function seoForBlog(): SeoData {
	return {
		title: 'Blog',
		description:
			'Notes on software design, payment safety, detection engineering, and shipping secure CI/CD without slowing teams.',
		path: '/blog'
	};
}

export function seoForContact(): SeoData {
	return {
		title: 'Contact',
		description:
			'Reach out for software engineering, security consulting, or DevSecOps work. Based in Abuja, Nigeria.',
		path: '/contact'
	};
}

export function seoForProject(project: Project): SeoData {
	return {
		title: `${project.title} | Projects`,
		description: project.description,
		image: project.image?.image,
		path: `/work/${project.slug}`,
		type: 'article',
		jsonLd: projectJsonLd(project, `/work/${project.slug}`)
	};
}

export function seoForPost(post: Post): SeoData {
	return {
		title: post.title,
		description: post.description,
		image: post.image,
		path: `/blog/${post.slug}`,
		type: 'article',
		jsonLd: articleJsonLd(post, `/blog/${post.slug}`)
	};
}

export function seoForNotFound(): SeoData {
	return {
		title: 'Page Not Found',
		description: 'This page does not exist. Head back home or get in touch.',
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
