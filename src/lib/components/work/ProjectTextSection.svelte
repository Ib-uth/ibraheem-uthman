<script lang="ts">
	import { animateChars, animateLines } from '$lib/actions/animateText';
	import type { ProjectSection } from '$lib/data/projects';

	let { section, leadingSpace = false }: { section: ProjectSection; leadingSpace?: boolean } =
		$props();
</script>

<section class="section project-text-section" class:project-text-section--leading-space={leadingSpace}>
	<div class="w-layout-blockcontainer main-container w-container">
		<div class="title-wrap-project">
			<div class="text-h4" animate-chars use:animateChars>{section.title}</div>
			<div animate-lines use:animateLines>{section.body}</div>
		</div>
	</div>
</section>
