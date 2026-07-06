<script lang="ts">
	import { awards } from '$lib/data/awards';
	import { animateChars } from '$lib/actions/animateText';
	import { awardsHover } from '$lib/actions/interactions';
</script>

<section class="section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-awards">
			<h2 class="no-margins" animate-chars use:animateChars>HOW I WORK</h2>
		</div>
		<div class="list-awards" use:awardsHover>
			{#each awards as award}
				<div class="awards-item">
					<div class="awards-item-inner">
						<h3 class="no-margins">{award.title}</h3>
						<div class="text-large">{award.subtitle}</div>
					</div>
					<div class="awards-bottom-line"></div>
					<div class="awards-image">
						<img
							src={award.image}
							loading="lazy"
							sizes={award.sizes}
							srcset={award.srcset}
							alt=""
							class="image-cover"
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
