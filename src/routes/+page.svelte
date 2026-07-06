<script lang="ts">
	import HeroHome from '$lib/components/home/HeroHome.svelte';
	import HomeAboutIntro from '$lib/components/home/HomeAboutIntro.svelte';
	import HomeServicesMarquee from '$lib/components/home/HomeServicesMarquee.svelte';
	import HomeFeaturedWork from '$lib/components/home/HomeFeaturedWork.svelte';
	import HomeTestimonials from '$lib/components/home/HomeTestimonials.svelte';
	import CtaSection from '$lib/components/CtaSection.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { seoForHome } from '$lib/seo';
</script>

<SeoHead {...seoForHome()} />

<HeroHome />
<HomeAboutIntro />
<HomeServicesMarquee />
<HomeFeaturedWork />
<HomeTestimonials />
<CtaSection />
