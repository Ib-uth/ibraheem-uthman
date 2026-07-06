<script lang="ts">
	type GalleryImage = {
		image: string;
		srcset: string;
		sizes: string;
		className?: string;
	};

	let { images }: { images: GalleryImage[] } = $props();
</script>

<section class="section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="w-dyn-list">
			<div role="list" class="project-gallery w-dyn-items">
				{#each images as image}
					<div role="listitem" class="w-dyn-item w-dyn-repeater-item">
						<div
							id="w-node-_026ac686-0154-3cb4-2376-4ea22e449ea7-b34b4a6d"
							class="image-wrap-bottom-gallery"
						>
							<img
								src={image.image}
								loading="lazy"
								alt=""
								sizes={image.sizes}
								srcset={image.srcset}
								class="image-cover"
							/>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
