import { projects } from '$lib/data/projects';
import { posts } from '$lib/data/posts';
import { SITE_URL } from '$lib/constants/site';
import { SITEMAP_CHANGEFREQ, SITEMAP_PRIORITY, SITEMAP_STATIC_PATHS } from '$lib/seo';

export const prerender = true;

function loc(path: string): string {
	const base = SITE_URL.replace(/\/$/, '');
	if (path === '/') return `${base}/`;
	return `${base}${path}`;
}

function urlEntry(path: string, lastmod: string, priority?: number, changefreq?: string): string {
	const priorityTag = priority !== undefined ? `\n    <priority>${priority.toFixed(1)}</priority>` : '';
	const changefreqTag = changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : '';
	return `  <url>
    <loc>${loc(path)}</loc>
    <lastmod>${lastmod}</lastmod>${changefreqTag}${priorityTag}
  </url>`;
}

export function GET() {
	const lastmod = new Date().toISOString().slice(0, 10);

	const staticUrls = SITEMAP_STATIC_PATHS.map((path) =>
		urlEntry(path, lastmod, SITEMAP_PRIORITY[path], SITEMAP_CHANGEFREQ[path])
	);

	const projectUrls = projects.map((project) =>
		urlEntry(`/work/${project.slug}`, lastmod, 0.7, 'monthly')
	);

	const postUrls = posts.map((post) => urlEntry(`/blog/${post.slug}`, lastmod, 0.7, 'monthly'));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...projectUrls, ...postUrls].join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
