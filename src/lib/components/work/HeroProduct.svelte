<script lang="ts">
	import { animateCharsLoad, animateLinesLoad } from '$lib/actions/animateText';
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<section class="section hero-product">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="headline-project">
			<h2 class="no-margins" animate-chars-load use:animateCharsLoad>{project.title}</h2>
			<div class="project-paragraph">
				<div animate-lines-load use:animateLinesLoad>{project.heroDescription}</div>
			</div>
		</div>
		<div class="info-line-cms">
			<div class="info-block-cms left">
				<div class="text-bold">SERVICE /</div>
				<div>{project.service}</div>
			</div>
			<div class="info-block-cms middle">
				<div class="text-bold">CLIENT /</div>
				<div>{project.client}</div>
			</div>
			<div class="info-block-cms">
				<div class="text-bold">YEAR /</div>
				<div>{project.year}</div>
			</div>
		</div>
		{#if project.image}
			<div class="main-image-cms">
				<img
					src={project.image.image}
					loading="lazy"
					alt=""
					width={project.image.width}
					height={project.image.height}
					sizes={project.image.sizes}
					srcset={project.image.srcset}
					class="image-cover"
				/>
			</div>
		{/if}
	</div>
</section>
