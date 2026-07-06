<script lang="ts">
	import CmsCardGrid from '$lib/components/CmsCardGrid.svelte';
	import type { ProjectImage } from '$lib/data/projects';

	type Tab = {
		id: string;
		label: string;
	};

	type CardItem = {
		slug: string;
		title: string;
		description: string;
		image?: ProjectImage | string;
		srcset?: string;
		sizes?: string;
		category?: string;
	};

	let { tabs, items, basePath, listClass = 'work' } = $props();

	let activeTab = $state('all');

	const filteredItems = $derived(
		activeTab === 'all'
			? items
			: items.filter((item) => item.category === activeTab)
	);
</script>

<div class="tabs-cms w-tabs">
	<div class="tabs-menu-cms w-tab-menu" role="tablist">
		{#each tabs as tab}
			<button
				type="button"
				role="tab"
				class="tab-cms w-inline-block w-tab-link"
				class:w--current={activeTab === tab.id}
				aria-selected={activeTab === tab.id}
				onclick={() => (activeTab = tab.id)}
			>
				<div>{tab.label}</div>
			</button>
		{/each}
	</div>
	<div class="tabs-content-cms w-tab-content">
		<div class="tab-panel-cms w-tab-pane w--tab-active" role="tabpanel">
			<div class="{listClass} w-dyn-list">
				<CmsCardGrid items={filteredItems} {basePath} />
			</div>
		</div>
	</div>
</div>
