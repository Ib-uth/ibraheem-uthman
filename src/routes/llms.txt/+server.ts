import { projects } from '$lib/data/projects';
import { posts } from '$lib/data/posts';
import {
	DEFAULT_DESCRIPTION,
	SITE_EMAIL,
	SITE_NAME,
	SITE_URL,
	SOCIAL_PROFILES
} from '$lib/constants/site';
import { SITEMAP_STATIC_PATHS } from '$lib/seo';

export const prerender = true;

function loc(path: string): string {
	const base = SITE_URL.replace(/\/$/, '');
	if (path === '/') return `${base}/`;
	return `${base}${path}`;
}

const STATIC_PAGES: Record<string, string> = {
	'/': 'Home — software and security engineering portfolio',
	'/about': 'Background, experience, and how I work',
	'/services': 'Full-stack engineering, DevSecOps, detection engineering, cloud security, pentesting',
	'/work': 'Selected projects in software, fintech, and security',
	'/blog': 'Writing on payments, CI/CD, detection engineering, and system design',
	'/contact': 'Get in touch for engineering or security work'
};

export function GET() {
	const staticLinks = SITEMAP_STATIC_PATHS.map(
		(path) => `- [${path === '/' ? 'Home' : path.slice(1).replace(/^\w/, (c) => c.toUpperCase())}](${loc(path)}): ${STATIC_PAGES[path]}`
	).join('\n');

	const projectLinks = projects
		.map((project) => `- [${project.title}](${loc(`/work/${project.slug}`)}): ${project.description}`)
		.join('\n');

	const postLinks = posts
		.map((post) => `- [${post.title}](${loc(`/blog/${post.slug}`)}): ${post.description}`)
		.join('\n');

	const body = `# ${SITE_NAME}

> ${DEFAULT_DESCRIPTION}

Software and security engineer based in Abuja, Nigeria. I build full-stack systems, secure APIs, and detection pipelines. Reach me at ${SITE_EMAIL}.

## Main pages

${staticLinks}

## Projects

${projectLinks}

## Blog

${postLinks}

## Optional

- [Sitemap](${loc('/sitemap.xml')}): machine-readable list of all public URLs
- [GitHub](${SOCIAL_PROFILES[0]}): open-source work and code samples
- [LinkedIn](${SOCIAL_PROFILES[1]}): professional profile
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
