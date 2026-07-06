<script lang="ts">
	import { stats } from '$lib/data/stats';
	import { animateChars, animateLines } from '$lib/actions/animateText';
</script>

<section class="section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="w-layout-grid numbers-grid">
			{#each stats as stat}
				<div class="number-tile">
					<div class="text-h2">
						<span animate-chars use:animateChars>{stat.number}</span>
						{#if stat.suffix}
							<span class="stat-suffix">{stat.suffix}</span>
						{/if}
					</div>
					<div class="text-large" animate-lines use:animateLines>{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
