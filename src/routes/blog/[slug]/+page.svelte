<script lang="ts">
	import HeroBlog from '$lib/components/blog/HeroBlog.svelte';
	import BlogArticleBody from '$lib/components/blog/BlogArticleBody.svelte';
	import ProjectBottomGallery from '$lib/components/work/ProjectBottomGallery.svelte';
	import MoreBlogs from '$lib/components/blog/MoreBlogs.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead {...data.seo} />

<HeroBlog post={data.post} />
<BlogArticleBody blocks={data.post.bodyTop} />
<ProjectBottomGallery images={data.post.gallery} />
<BlogArticleBody blocks={data.post.bodyBottom} />
<MoreBlogs posts={data.relatedPosts} />
<CtaSection />
