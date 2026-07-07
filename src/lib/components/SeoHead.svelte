<script lang="ts">
	import { buildSeo, type SeoData } from '$lib/seo';
	import { SITE_LOCATION, SITE_NAME, TWITTER_HANDLE } from '$lib/constants/site';

	let props: SeoData = $props();

	const seo = $derived(buildSeo(props));
	const jsonLdItems = $derived(
		props.jsonLd
			? Array.isArray(props.jsonLd)
				? props.jsonLd
				: [props.jsonLd]
			: []
	);
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="author" content={SITE_NAME} />
	<meta name="creator" content={SITE_NAME} />
	<meta name="publisher" content={SITE_NAME} />
	<link rel="canonical" href={seo.canonical} />
	<meta name="robots" content={seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />

	<!-- Open Graph -->
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.socialDescription} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:image:secure_url" content={seo.ogImage} />
	<meta property="og:image:alt" content={seo.ogImageAlt} />
	<meta property="og:image:type" content={seo.ogImageType} />
	{#if seo.ogImageWidth}
		<meta property="og:image:width" content={String(seo.ogImageWidth)} />
	{/if}
	{#if seo.ogImageHeight}
		<meta property="og:image:height" content={String(seo.ogImageHeight)} />
	{/if}
	<meta property="og:url" content={seo.canonical} />
	<meta property="og:type" content={seo.type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_NG" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_HANDLE} />
	<meta name="twitter:creator" content={TWITTER_HANDLE} />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.socialDescription} />
	<meta name="twitter:image" content={seo.ogImage} />
	<meta name="twitter:image:alt" content={seo.ogImageAlt} />

	<!-- LLM-readable site summary -->
	<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />

	<meta name="theme-color" content="#12181f" />
	<meta name="geo.region" content="NG-FC" />
	<meta name="geo.placename" content={SITE_LOCATION} />

	{#each jsonLdItems as item}
		<svelte:element this={'script'} type="application/ld+json">
			{JSON.stringify(item)}
		</svelte:element>
	{/each}
</svelte:head>
