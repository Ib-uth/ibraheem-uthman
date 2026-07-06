<script lang="ts">
	import { onMount } from 'svelte';
	import { testimonials } from '$lib/data/testimonials';
	import { animateChars } from '$lib/actions/animateText';
	import { fadeInScroll } from '$lib/actions/interactions';
	import { gsapReady, Draggable } from '$lib/gsap/register';
	import QuoteIcon from '$lib/components/QuoteIcon.svelte';

	let wrapper: HTMLElement | undefined = $state();

	onMount(() => {
		if (!wrapper) return;

		let instances: ReturnType<typeof Draggable.create> = [];

		void gsapReady().then(() => {
			const cards = wrapper!.querySelectorAll<HTMLElement>('.card-testimonial');
			cards.forEach((card) => {
				card.style.willChange = 'transform';
				card.style.transformStyle = 'preserve-3d';
			});

			instances = Draggable.create(cards, {
				type: 'x,y',
				edgeResistance: 0.65,
				inertia: true,
				bounds: wrapper!
			});
		});

		return () => {
			instances.forEach((d) => d.kill());
		};
	});
</script>

<section class="section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-testimonials">
			<h2 class="no-margins" animate-chars use:animateChars>WHAT OTHERS SAY</h2>
		</div>
		<div class="testimonial-wrapper" bind:this={wrapper}>
			{#each testimonials as testimonial}
				<div class="wrap-testimonial-card" use:fadeInScroll>
					<div class="card-testimonial {testimonial.className}">
						<QuoteIcon />
						<div>{testimonial.quote}</div>
						<div class="author-wrap-testimonial">
							<div class="text-h5">{testimonial.name}</div>
							<div class="text-small">{testimonial.role}</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
