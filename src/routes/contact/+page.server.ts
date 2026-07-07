import { fail } from '@sveltejs/kit';
import { handleContactSubmission } from '$lib/server/contact/handle-submission';
import type { Actions } from './$types';

export const prerender = false;

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const result = await handleContactSubmission(request, getClientAddress);

		if (!result.ok) {
			return fail(result.status, { error: result.error });
		}

		return { success: true as const };
	}
} satisfies Actions;
