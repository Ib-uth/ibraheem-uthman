<script lang="ts">
	import { animateCharsLoad } from '$lib/actions/animateText';
	import CmsTabs from '$lib/components/CmsTabs.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { projects, workTabs } from '$lib/data/projects';
	import { seoForWork } from '$lib/seo';
</script>

<SeoHead {...seoForWork()} />

<section class="section hero-work">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-work">
			<h2 class="no-margins" animate-chars-load use:animateCharsLoad>FEATURED PROJECTS</h2>
		</div>
		<CmsTabs tabs={[...workTabs]} items={projects} basePath="/project" listClass="work" />
	</div>
</section>
<CtaSection />
