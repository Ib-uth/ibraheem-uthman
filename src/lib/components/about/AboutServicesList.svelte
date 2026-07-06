<script lang="ts">
	import { aboutServices } from '$lib/data/aboutServices';
	import { animateLines } from '$lib/actions/animateText';
</script>

<section class="section about-service-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="w-layout-grid about-services-halves">
			<div class="headline-about-services">
				<h2 class="no-margins" animate-lines use:animateLines>GET TO KNOW ME</h2>
			</div>
			<div id="w-node-d89d032e-7397-4e97-e0ae-6e33ee6cb840-0a0a70d5" class="about-services-list">
				{#each aboutServices as service}
					<div class="card-service{service.className ? ` ${service.className}` : ''}">
						<div class="text-h4">{service.title}</div>
						<div>{service.description}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
