<script lang="ts">
	import HeroAbout from '$lib/components/about/HeroAbout.svelte';
	import AboutStats from '$lib/components/about/AboutStats.svelte';
	import AboutServicesList from '$lib/components/about/AboutServicesList.svelte';
	import AboutAwards from '$lib/components/about/AboutAwards.svelte';
	import AboutStoryGallery from '$lib/components/about/AboutStoryGallery.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { seoForAbout } from '$lib/seo';
</script>

<SeoHead {...seoForAbout()} />

<HeroAbout />
<AboutStats />
<AboutServicesList />
<AboutAwards />
<AboutStoryGallery />
<CtaSection />
