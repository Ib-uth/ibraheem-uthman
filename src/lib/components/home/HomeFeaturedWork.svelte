<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { animateChars } from '$lib/actions/animateText';
	import { projectCard } from '$lib/actions/projectCard';
</script>

<section class="section home-work-section">
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-work-home">
			<h2 class="no-margins" animate-chars use:animateChars>FEATURED PROJECTS</h2>
		</div>
		<div class="work w-dyn-list">
			<div role="list" class="home-work-halves w-dyn-items">
				{#each projects as project}
					<div role="listitem" class="home-work-item w-dyn-item">
						<a href="/work/{project.slug}" class="link-cms w-inline-block" use:projectCard>
							{#if project.image}
								<div class="image-wrap-project">
									<img
										src={project.image.image}
										loading="lazy"
										alt=""
										width={project.image.width}
										height={project.image.height}
										sizes={project.image.sizes}
										srcset={project.image.srcset}
										class="liquid-image"
									/>
								</div>
							{/if}
							<div class="text-wrap-project">
								<div class="text-h5">{project.title}</div>
								<div>{project.description}</div>
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
		</div>
	</div>
</section>
