<script lang="ts">
	import { buildSeo, type SeoData } from '$lib/seo';
	import { SITE_NAME, THEME_COLOR } from '$lib/constants/site';

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
	<link rel="canonical" href={seo.canonical} />
	<meta name="robots" content={seo.noindex ? 'noindex, nofollow' : 'index, follow'} />

	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:url" content={seo.canonical} />
	<meta property="og:type" content={seo.type} />
	<meta property="og:site_name" content={SITE_NAME} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={seo.ogImage} />

	<meta name="theme-color" content={THEME_COLOR} />

	{#each jsonLdItems as item}
		<svelte:element this={'script'} type="application/ld+json">
			{JSON.stringify(item)}
		</svelte:element>
	{/each}
</svelte:head>
