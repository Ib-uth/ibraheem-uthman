<script lang="ts">
	import HeroContact from '$lib/components/contact/HeroContact.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { seoForContact } from '$lib/seo';
</script>

<SeoHead {...seoForContact()} />

<HeroContact />
