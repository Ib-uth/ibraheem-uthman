<script lang="ts">
	import { aboutServices } from '$lib/data/aboutServices';
</script>

<section class="section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="master-service-cards">
			{#each aboutServices as service}
				<div class="card-service {service.className} no-sticky">
					<div class="text-h4">{service.title}</div>
					<div>{service.description}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
