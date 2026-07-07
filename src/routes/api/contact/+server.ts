import { json, type RequestHandler } from '@sveltejs/kit';
import { corsHeaders } from '$lib/server/contact/allowed-origins';
import { handleContactSubmission } from '$lib/server/contact/handle-submission';

export const prerender = false;

const JSON_HEADERS = {
	'Cache-Control': 'no-store',
	'X-Content-Type-Options': 'nosniff'
} as const;

export const OPTIONS: RequestHandler = async ({ request }) => {
	const cors = corsHeaders(request);
	if (request.headers.get('origin') && Object.keys(cors).length === 0) {
		return new Response(null, { status: 403 });
	}
	return new Response(null, { status: 204, headers: cors });
};

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const cors = corsHeaders(request);
	const result = await handleContactSubmission(request, getClientAddress);

	if (!result.ok) {
		return json(
			{ error: result.error },
			{ status: result.status, headers: { ...cors, ...JSON_HEADERS } }
		);
	}

	return json({ ok: true }, { headers: { ...cors, ...JSON_HEADERS } });
};
