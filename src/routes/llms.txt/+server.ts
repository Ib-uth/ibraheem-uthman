import { projects } from '$lib/data/projects';
import { posts } from '$lib/data/posts';
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_OG_IMAGE,
	SITE_EMAIL,
	SITE_LOCATION,
	SITE_NAME,
	SITE_TAGLINE,
	SITE_URL,
	SOCIAL_PROFILES
} from '$lib/constants/site';
import { absoluteUrl, SITEMAP_STATIC_PATHS } from '$lib/seo';

export const prerender = true;

function loc(path: string): string {
	const base = SITE_URL.replace(/\/$/, '');
	if (path === '/') return `${base}/`;
	return `${base}${path}`;
}

const STATIC_PAGES: Record<string, string> = {
	'/': 'Home — software and security engineering portfolio',
	'/about': 'Background, experience, principles, and how I work',
	'/services':
		'Full-stack engineering, API design, DevSecOps, detection engineering, cloud security, penetration testing',
	'/work': 'Selected projects in software, fintech, literary publishing, and security',
	'/blog': 'Writing on payments, CI/CD, detection engineering, failure modeling, and system design',
	'/contact': 'Get in touch for engineering or security work'
};

export function GET() {
	const staticLinks = SITEMAP_STATIC_PATHS.map(
		(path) =>
			`- [${path === '/' ? 'Home' : path.slice(1).replace(/^\w/, (c) => c.toUpperCase())}](${loc(path)}): ${STATIC_PAGES[path]}`
	).join('\n');

	const projectLinks = projects
		.map((project) => `- [${project.title}](${loc(`/work/${project.slug}`)}): ${project.description}`)
		.join('\n');

	const postLinks = posts
		.map((post) => `- [${post.title}](${loc(`/blog/${post.slug}`)}): ${post.description}`)
		.join('\n');

	const body = `# ${SITE_NAME}

> ${DEFAULT_DESCRIPTION}

${SITE_NAME} is a ${SITE_TAGLINE.toLowerCase()} based in ${SITE_LOCATION}. He builds full-stack systems, secure APIs, and detection pipelines. Primary contact: ${SITE_EMAIL}.

## Identity

- Name: ${SITE_NAME}
- Role: ${SITE_TAGLINE}
- Location: ${SITE_LOCATION}
- Email: ${SITE_EMAIL}
- Website: ${SITE_URL}
- Portrait: ${absoluteUrl(DEFAULT_OG_IMAGE)}

## Main pages

${staticLinks}

## Projects

${projectLinks}

## Blog

${postLinks}

## Social profiles

- GitHub: ${SOCIAL_PROFILES[0]}
- LinkedIn: ${SOCIAL_PROFILES[1]}
- Twitter/X: ${SOCIAL_PROFILES[2]}
- Instagram: ${SOCIAL_PROFILES[3]}

## Optional

- [Sitemap](${loc('/sitemap.xml')}): machine-readable list of all public URLs
- [Humans.txt](${loc('/humans.txt')}): site credits and contact
- [Security.txt](${loc('/.well-known/security.txt')}): security contact information
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
