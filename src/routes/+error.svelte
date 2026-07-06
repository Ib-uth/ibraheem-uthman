<script lang="ts">
	import { animateCharsLoad, animateLines } from '$lib/actions/animateText';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { seoForNotFound } from '$lib/seo';

	let { status = 404 }: { error?: App.Error; status?: number } = $props();

	const code = $derived(status === 404 ? '404' : String(status));
</script>

<SeoHead {...seoForNotFound()} />

<section class="section error-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="error-inner">
			<p class="error-eyebrow" animate-chars-load use:animateCharsLoad>LOST SIGNAL</p>
			<h1 class="text-h1 error-code" animate-chars-load use:animateCharsLoad>{code}</h1>
			<div class="error-copy">
				<p class="text-h3 error-headline" animate-lines use:animateLines>PAGE NOT FOUND</p>
			</div>
			<div class="error-actions">
				<a href="/" class="cta-main w-button">BACK HOME</a>
				<a href="/contact" class="cta-main light w-button">CONTACT ME</a>
			</div>
		</div>
	</div>
	<div class="error-glow" aria-hidden="true"></div>
</section>

<style>
	.error-section {
		position: relative;
		min-height: 70vh;
		display: flex;
		align-items: center;
		background-color: var(--color-bg-light);
		color: var(--color-bg-dark);
		overflow: hidden;
	}

	.error-inner {
		position: relative;
		z-index: 1;
		max-width: 52rem;
		padding: 6rem 0 8rem;
	}

	.error-eyebrow {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		letter-spacing: 0.2em;
		color: var(--color-accent-blue);
	}

	.error-code {
		margin: 0;
		line-height: 0.9;
		font-size: clamp(5rem, 18vw, 12rem);
		color: var(--color-bg-dark);
	}

	.error-copy {
		margin-top: 2rem;
		max-width: 36rem;
	}

	.error-headline {
		margin: 0;
	}

	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2.5rem;
	}

	.error-glow {
		position: absolute;
		right: -10%;
		bottom: -20%;
		width: min(50vw, 28rem);
		height: min(50vw, 28rem);
		border-radius: 50%;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-bg-mid) 35%, transparent) 0%,
			transparent 70%
		);
		opacity: 0.45;
		pointer-events: none;
	}
</style>
