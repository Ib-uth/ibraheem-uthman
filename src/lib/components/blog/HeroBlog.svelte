<script lang="ts">
	import { animateCharsLoad } from '$lib/actions/animateText';
	import type { Post } from '$lib/data/posts';

	let { post }: { post: Post } = $props();
</script>

<section class="section hero-product">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="headline-project">
			<h2 class="no-margins" animate-chars-load use:animateCharsLoad>{post.title}</h2>
		</div>
		<div class="info-line-cms">
			<div class="info-block-cms left">
				<div class="text-bold">AUTHOR /</div>
				<div>{post.author}</div>
			</div>
			<div class="info-block-cms">
				<div class="text-bold">YEAR /</div>
				<div>{post.year}</div>
			</div>
		</div>
		<div class="main-image-cms">
			<img
				src={post.image}
				loading="lazy"
				alt=""
				sizes={post.sizes}
				srcset={post.srcset}
				class="image-cover"
			/>
		</div>
	</div>
</section>
