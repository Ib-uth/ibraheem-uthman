<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import { ScrollTrigger } from '$lib/gsap/register';
	import { personJsonLd } from '$lib/seo';

	let { children } = $props();
	let lenis: Lenis | undefined;

	onMount(() => {
		ScrollTrigger.refresh();

		lenis = new Lenis({
			lerp: 0.1,
			wheelMultiplier: 0.7,
			gestureOrientation: 'vertical',
			normalizeWheel: false,
			smoothTouch: false
		});

		lenis.on('scroll', ScrollTrigger.update);

		let rafId = 0;
		const raf = (time: number) => {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis?.destroy();
		};
	});

	afterNavigate(() => {
		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/ibraheem.shared.min.css" />
	<link rel="stylesheet" href="/css/ibraheem-overrides.css" />
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	{#if $page.url.pathname === '/'}
		<svelte:element this={'script'} type="application/ld+json">
			{JSON.stringify(personJsonLd)}
		</svelte:element>
	{/if}
</svelte:head>

<SiteNav />
{@render children()}
<SiteFooter />
