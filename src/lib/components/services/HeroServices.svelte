<script lang="ts">
	import { animateCharsLoad } from '$lib/actions/animateText';
	import { tagParallax } from '$lib/actions/interactions';
</script>

<section class="section hero-services" use:tagParallax>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="master-services-hero">
			<div class="title-services">
				<h1 animate-chars-load use:animateCharsLoad>WHAT I DO?</h1>
			</div>
			<div>
				<div class="first-tag">
					<div class="tag cta-first">
						<div class="tag-text">BUILT TO LAST</div>
					</div>
				</div>
				<div class="second-tag">
					<div class="tag cta-second">
						<div class="tag-text">SECURITY = FUNCTION</div>
					</div>
				</div>
				<div class="third-tag">
					<div class="tag cta-third">
						<div class="tag-text">THINK IN SYSTEMS</div>
					</div>
				</div>
				<div class="fourth-tag">
					<div class="tag cta-fourth">
						<div class="tag-text">FAILURE FIRST</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
