<script lang="ts">
	import type { ProjectImage } from '$lib/data/projects';

	let { image }: { image: ProjectImage } = $props();
</script>

<section class="section project-feature-image-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="main-image-cms">
			<img
				src={image.image}
				loading="lazy"
				alt=""
				width={image.width}
				height={image.height}
				sizes={image.sizes}
				srcset={image.srcset}
				class="image-cover"
			/>
		</div>
	</div>
</section>
