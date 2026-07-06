<script lang="ts">
	import { animateLines } from '$lib/actions/animateText';
	import { tagParallax } from '$lib/actions/interactions';
</script>

<section class="section cta-section" use:tagParallax>
	<div class="w-layout-blockcontainer main-container w-container">
		<a href="/contact" class="master-cta-block w-inline-block">
			<div class="title-cta">
				<div class="text-h1" animate-lines use:animateLines>HAVE AN IDEA?</div>
				<div class="icon-wrap-cta">
					<img
						src="/images/68611125d0c89f06fbfb8d18_Chat Icon.svg"
						loading="lazy"
						alt=""
						class="icon-cta"
					/>
					<div class="bg-cta-icon"></div>
				</div>
			</div>
			<div class="first-tag">
				<div class="tag cta-first">
					<div class="tag-text">LET'S WORK!</div>
				</div>
			</div>
			<div class="second-tag">
				<div class="tag cta-second">
					<div class="tag-text">HELLO</div>
				</div>
			</div>
			<div class="third-tag">
				<div class="tag cta-third">
					<div class="tag-text">CONTACT ME</div>
				</div>
			</div>
			<div class="fourth-tag">
				<div class="tag cta-fourth">
					<div class="tag-text">HOLA</div>
				</div>
			</div>
		</a>
	</div>
</section>
