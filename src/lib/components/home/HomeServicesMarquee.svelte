<script lang="ts">
	import { homeServices } from '$lib/data/homeServices';
	import { marquee } from '$lib/actions/marquee';
	import { serviceMarqueeSection } from '$lib/actions/interactions';
</script>

<section class="section home-services-section">
	<div class="master-services" use:serviceMarqueeSection>
		{#each homeServices as service}
			<div class="master-marquee {service.className}">
				<div
					class="marquee-services"
					use:marquee={{ direction: service.direction, duration: 25 }}
				>
					{#each Array(3) as _}
						<div class="single-marquee-services">
							<div class="text-h1">{service.label}</div>
							<div class="text-h1">/</div>
							<div class="text-h1">{service.label}</div>
							<div class="text-h1">/</div>
						</div>
					{/each}
				</div>
				<div class="image-wrap-service">
					<img
						src={service.image}
						loading="lazy"
						sizes={service.sizes}
						srcset={service.srcset}
						alt=""
						class="image-cover"
					/>
				</div>
			</div>
		{/each}
	</div>
</section>

