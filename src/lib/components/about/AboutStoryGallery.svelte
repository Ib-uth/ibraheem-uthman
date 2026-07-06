<script lang="ts">
	import { img } from '$lib/constants/cdn';
	import { animateChars } from '$lib/actions/animateText';
	import { fadeInScroll } from '$lib/actions/interactions';
</script>

<section class="section about-story-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-awards">
			<h2 class="no-margins" animate-chars use:animateChars>BEHIND THE CODE</h2>
		</div>
		<div class="master-about-story">
			<div class="story-row">
				<div class="story-image-1" use:fadeInScroll>
					<div class="about-story-image _1">
						<img
							src={img('686405f488560f744d9cbd10_Story%20Image.webp')}
							loading="lazy"
							sizes="(max-width: 661px) 100vw, 661px"
							srcset="{img('686405f488560f744d9cbd10_Story%20Image-p-500.webp')} 500w, {img('686405f488560f744d9cbd10_Story%20Image.webp')} 661w"
							alt=""
							class="image-cover"
						/>
					</div>
					<div class="tag-story-1">
						<div class="tag story-1">
							<div class="tag-text">CODE FIRST</div>
						</div>
					</div>
				</div>
				<div class="story-image-2" use:fadeInScroll>
					<div class="about-story-image _2">
						<img
							src={img('686405f6c5a414d5c636995c_Story%20Image-2.webp')}
							loading="lazy"
							sizes="(max-width: 661px) 100vw, 661px"
							srcset="{img('686405f6c5a414d5c636995c_Story%20Image-2-p-500.webp')} 500w, {img('686405f6c5a414d5c636995c_Story%20Image-2.webp')} 661w"
							alt=""
							class="image-cover"
						/>
					</div>
				</div>
			</div>
			<div class="story-row">
				<div class="story-image-3" use:fadeInScroll>
					<div class="about-story-image _3">
						<img
							src={img('686405f43e7b2082bad490cf_Story%20Image-1.webp')}
							loading="lazy"
							sizes="(max-width: 661px) 100vw, 661px"
							srcset="{img('686405f43e7b2082bad490cf_Story%20Image-1-p-500.webp')} 500w, {img('686405f43e7b2082bad490cf_Story%20Image-1.webp')} 661w"
							alt=""
							class="image-cover"
						/>
					</div>
					<div class="tag-story-2">
						<div class="tag story-2">
							<div class="tag-text">COFFEE FIRST</div>
						</div>
					</div>
				</div>
				<div class="story-image-4" use:fadeInScroll>
					<div class="about-story-image _4">
						<img
							src={img('686405f589dcb33afc41ccf1_Story%20Image-3.webp')}
							loading="lazy"
							sizes="(max-width: 661px) 100vw, 661px"
							srcset="{img('686405f589dcb33afc41ccf1_Story%20Image-3-p-500.webp')} 500w, {img('686405f589dcb33afc41ccf1_Story%20Image-3.webp')} 661w"
							alt=""
							class="image-cover"
						/>
					</div>
					<div class="tag-story-3">
						<div class="tag story-3">
							<div class="tag-text">WALK & THINK</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
