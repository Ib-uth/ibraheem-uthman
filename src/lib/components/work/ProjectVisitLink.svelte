<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	const label = $derived(
		project.liveUrlLabel ??
			(project.liveUrl
				? `VISIT ${new URL(project.liveUrl).hostname.replace(/^www\./, '').toUpperCase()}`
				: '')
	);
</script>

{#if project.liveUrl}
	<section class="section project-visit-section">
		<div class="w-layout-blockcontainer main-container w-container">
			<div class="project-visit-wrap">
				<a
					href={project.liveUrl}
					class="cta-main w-button project-visit-link"
					target="_blank"
					rel="noopener noreferrer"
				>
					{label}
				</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.project-visit-wrap {
		display: flex;
		justify-content: center;
		padding-top: var(--_spacing---spacing--16, 16px);
		padding-bottom: var(--_spacing---spacing--48, 48px);
	}

	.project-visit-link {
		display: inline-block;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
	}
</style>
