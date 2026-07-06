import { projects } from '$lib/data/projects';
import { posts } from '$lib/data/posts';
import { SITE_URL } from '$lib/constants/site';
import { SITEMAP_STATIC_PATHS } from '$lib/seo';

export const prerender = true;

function loc(path: string): string {
	const base = SITE_URL.replace(/\/$/, '');
	if (path === '/') return `${base}/`;
	return `${base}${path}`;
}

export function GET() {
	const urls = [
		...SITEMAP_STATIC_PATHS.map(loc),
		...projects.map((project) => loc(`/work/${project.slug}`)),
		...posts.map((post) => loc(`/blog/${post.slug}`))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
