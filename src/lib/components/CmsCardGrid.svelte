<script lang="ts">
	import { projectCard } from '$lib/actions/projectCard';
	import type { ProjectImage } from '$lib/data/projects';

	type CardItem = {
		slug: string;
		title: string;
		description: string;
		image?: ProjectImage | string;
		srcset?: string;
		sizes?: string;
	};

	function resolveCardImage(item: CardItem): ProjectImage | null {
		if (!item.image) return null;
		if (typeof item.image !== 'string') return item.image;
		return {
			image: item.image,
			srcset: item.srcset ?? item.image,
			sizes: item.sizes ?? '(max-width: 767px) 100vw, 1028px',
			width: 1028,
			height: 661
		};
	}

	let {
		items,
		basePath
	}: {
		items: CardItem[];
		basePath: '/project' | '/blog';
	} = $props();
</script>

<div role="list" class="cms-halves w-dyn-items">
	{#each items as item}
		{@const cardImage = resolveCardImage(item)}
		<div role="listitem" class="cms-item w-dyn-item">
			<a href="{basePath}/{item.slug}" class="link-cms w-inline-block" use:projectCard>
				{#if cardImage}
					<div class="image-wrap-project">
						<img
							src={cardImage.image}
							loading="lazy"
							alt=""
							width={cardImage.width}
							height={cardImage.height}
							sizes={cardImage.sizes}
							srcset={cardImage.srcset}
							class="liquid-image"
						/>
					</div>
				{/if}
				<div class="text-wrap-project">
					<div class="text-h5">{item.title}</div>
					<div>{item.description}</div>
				</div>
				<div class="cursor-master">
					<div class="cursor">
						<div>VIEW</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>
