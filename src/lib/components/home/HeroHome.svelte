<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from '$lib/gsap/register';
	import { animateLinesLoad } from '$lib/actions/animateText';
	import { tagParallax } from '$lib/actions/interactions';

	let section: HTMLElement | undefined = $state();

	onMount(() => {
		if (!section) return;

		const left = section.querySelector('.title-side-home.left');
		const right = section.querySelector('.title-side-home.right');
		const tags = section.querySelectorAll('.hero-tag-first, .hero-tag-second, .hero-tag-third');

		gsap.set([left, right], { y: '150%', rotation: 4 });
		gsap.set(tags, { opacity: 0 });

		const tl = gsap.timeline({ delay: 0.2 });
		if (left) tl.to(left, { y: '0%', rotation: 0, duration: 0.75, ease: 'circ.out' }, 0);
		if (right) tl.to(right, { y: '0%', rotation: 0, duration: 0.75, ease: 'circ.out' }, 0.05);
		tl.to(tags, { opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 0.3);

		const circle = section.querySelector('.cirle-hero-cta');
		if (circle) {
			gsap.to(circle, {
				rotation: 360,
				duration: 15,
				ease: 'none',
				repeat: -1
			});
		}
	});
</script>

<section class="section hero-home" bind:this={section} use:tagParallax>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="master-hero">
			<div class="wrap-hero-title">
				<div class="title-hero">
					<img
						src="/images/6861065a2ba0ef46f7236435_PRODUCT.svg"
						loading="lazy"
						alt=""
						class="title-side-home left"
					/>
					<img
						src="/images/6861065ad69effd56130b54d_DESIGNER.svg"
						loading="lazy"
						alt=""
						class="title-side-home right"
					/>
				</div>
			</div>
			<div class="hero-tag-first">
				<div class="tag hero-first">
					<div class="tag-text">ENGINEERING</div>
				</div>
			</div>
			<div class="hero-tag-second">
				<div class="tag hero-second">
					<div class="tag-text">SECURITY-FIRST</div>
				</div>
			</div>
			<div class="hero-tag-third">
				<div class="tag hero-third">
					<div class="tag-text">FULL-STACK</div>
				</div>
			</div>
		</div>
		<div class="master-hero-image">
			<div class="hero-paragraph">
				<div animate-lines-load use:animateLinesLoad>
					Software and security engineer. I model failure before the happy path, build systems the next
					engineer can maintain, and find what structure hides before attackers exploit it.
				</div>
				<img
					src="/images/6860280c87cb2aa4874b98e8_Notch (1).svg"
					loading="eager"
					alt=""
					class="hero-notch-top"
				/>
				<img
					src="/images/6860280c87cb2aa4874b98e8_Notch (1).svg"
					loading="eager"
					alt=""
					class="hero-notch-top second"
				/>
			</div>
			<div class="hero-image">
				<div class="hero-image-cta">
					<div class="cirle-hero-cta">
						<img
							src="/images/686029a0c590009f063d0436_Circle CTA.svg"
							loading="lazy"
							alt=""
							class="cirlce-cta"
						/>
					</div>
					<img
						src="/images/6860280c87cb2aa4874b98e8_Notch (1).svg"
						loading="eager"
						alt=""
						class="hero-notch-bottom"
					/>
					<img
						src="/images/6860280c87cb2aa4874b98e8_Notch (1).svg"
						loading="eager"
						alt=""
						class="hero-notch-bottom second"
					/>
				</div>
			</div>
		</div>
	</div>
</section>
