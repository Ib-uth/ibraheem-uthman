<script lang="ts">
	import type { ArticleBlock } from '$lib/data/posts';

	let { blocks }: { blocks: ArticleBlock[] } = $props();
</script>

<section class="section project-text-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="body-article w-richtext">
			{#each blocks as block}
				<h4>{block.heading}</h4>
				<p>‍</p>
				{#each block.paragraphs as paragraph}
					<p>{paragraph}</p>
					<p>‍</p>
				{/each}
				<p>‍</p>
			{/each}
		</div>
	</div>
</section>
