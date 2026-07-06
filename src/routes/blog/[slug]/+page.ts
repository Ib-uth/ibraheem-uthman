import { posts, getPostBySlug, getRelatedPosts } from '$lib/data/posts';
import { seoForPost } from '$lib/seo';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	return posts.map((post) => ({ slug: post.slug }));
}

export const load: PageLoad = ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) throw error(404, 'Post not found');
	return {
		post,
		relatedPosts: getRelatedPosts(post.relatedSlugs),
		seo: seoForPost(post)
	};
};
