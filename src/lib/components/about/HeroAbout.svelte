<script lang="ts">
	import { onMount } from 'svelte';
	import { animateLinesLoad } from '$lib/actions/animateText';
	import { aboutHeroParallax, tagParallax } from '$lib/actions/interactions';
	import { gsap } from '$lib/gsap/register';

	let section: HTMLElement | undefined = $state();

	onMount(() => {
		const circle = section?.querySelector('.circle-about');
		if (circle) {
			gsap.set(circle, { opacity: 0 });
			gsap.to(circle, { opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' });
			gsap.to(circle, {
				rotation: 360,
				duration: 15,
				ease: 'none',
				repeat: -1
			});
		}

		const overlay = section?.querySelector('.overlay-about-image');
		if (overlay) {
			gsap.fromTo(
				overlay,
				{ width: '100%', height: '100%' },
				{ width: '0%', height: '0%', duration: 1, delay: 0.3, ease: 'power2.inOut' }
			);
		}
	});
</script>

<section class="section hero-about" bind:this={section} use:aboutHeroParallax>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="master-services-hero" use:tagParallax>
			<div class="title-services">
				<h1 class="title-about" animate-lines-load use:animateLinesLoad>ABOUT IBRAHEEM</h1>
				<div class="about-main-image">
					<img src="/images/about-hero.webp" loading="lazy" alt="" class="image-cover" />
					<div class="overlay-about-image"></div>
				</div>
			</div>
			<div>
				<div class="first-tag">
					<div class="tag cta-first">
						<div class="tag-text">HOW IT STARTED?</div>
					</div>
				</div>
				<div class="second-tag">
					<div class="tag cta-second">
						<div class="tag-text">WHAT'S THE STORY?</div>
					</div>
				</div>
				<div class="third-tag">
					<div class="tag cta-third">
						<div class="tag-text">WHO AM I?</div>
					</div>
				</div>
				<div class="fourth-tag">
					<div class="tag cta-fourth">
						<div class="tag-text">WHAT I DO?</div>
					</div>
				</div>
			</div>
		</div>
		<img
			src="/images/686029a0c590009f063d0436_Circle CTA.svg"
			loading="lazy"
			alt=""
			class="circle-about"
		/>
	</div>
</section>
