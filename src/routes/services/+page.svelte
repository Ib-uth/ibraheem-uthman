<script lang="ts">
	import HeroServices from '$lib/components/services/HeroServices.svelte';
	import ServicesCards from '$lib/components/services/ServicesCards.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { seoForServices } from '$lib/seo';
</script>

<SeoHead {...seoForServices()} />

<HeroServices />
<ServicesCards />
<CtaSection />
