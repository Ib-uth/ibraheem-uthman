<script lang="ts">
	import HeroProduct from '$lib/components/work/HeroProduct.svelte';
	import ProjectTextSection from '$lib/components/work/ProjectTextSection.svelte';
	import ProjectFeatureImage from '$lib/components/work/ProjectFeatureImage.svelte';
	import ProjectVisitLink from '$lib/components/work/ProjectVisitLink.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SeoHead {...data.seo} />

<HeroProduct project={data.project} />
{#each data.project.sections as section, index}
	<ProjectTextSection
		{section}
		leadingSpace={index === data.project.sections.length - 1 && index > 0}
	/>
	{#if index === 1 && data.project.secondaryImage}
		<ProjectFeatureImage image={data.project.secondaryImage} />
	{/if}
{/each}
<ProjectVisitLink project={data.project} />
<CtaSection />
