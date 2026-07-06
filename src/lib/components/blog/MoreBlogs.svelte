<script lang="ts">
	import { animateChars } from '$lib/actions/animateText';
	import CmsCardGrid from '$lib/components/CmsCardGrid.svelte';
	import type { Post } from '$lib/data/posts';

	let { posts }: { posts: Post[] } = $props();
</script>

<section class="section more-blogs">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-more-blogs">
			<h2 class="no-margins" animate-chars use:animateChars>EXLPORE OTHER ARTICLES</h2>
		</div>
		<div class="blog w-dyn-list">
			<CmsCardGrid items={posts} basePath="/blog" />
		</div>
	</div>
</section>
