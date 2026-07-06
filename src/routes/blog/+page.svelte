<script lang="ts">
	import { animateCharsLoad } from '$lib/actions/animateText';
	import CmsTabs from '$lib/components/CmsTabs.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { blogTabs, posts } from '$lib/data/posts';
	import { seoForBlog } from '$lib/seo';
</script>

<SeoHead {...seoForBlog()} />

<section class="section hero-work">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-work">
			<h2 class="no-margins" animate-chars-load use:animateCharsLoad>FEATURED ARTICLES</h2>
		</div>
		<CmsTabs tabs={[...blogTabs]} items={posts} basePath="/blog" listClass="blog" />
	</div>
</section>
<CtaSection />
