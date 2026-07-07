import { projects, getProjectBySlug } from '$lib/data/projects';
import { seoForProject } from '$lib/seo';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	return projects.map((project) => ({ slug: project.slug }));
}

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) throw error(404, 'Project not found');
	return {
		project,
		seo: seoForProject(project)
	};
};
