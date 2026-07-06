import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { SITE_URL } from '$lib/constants/site';
import { checkRateLimit } from '$lib/server/contact/rate-limit';
import { isFormTimingValid, parseContactPayload } from '$lib/server/contact/schema';
import { sendContactEmails } from '$lib/server/contact/send';

export const prerender = false;

const MAX_BODY_BYTES = 12_000;

function getClientIp(request: Request, getClientAddress: () => string): string {
	try {
		return getClientAddress();
	} catch {
		return (
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			'unknown'
		);
	}
}

function isAllowedOrigin(request: Request): boolean {
	const origin = request.headers.get('origin');
	if (!origin) return true;

	try {
		const allowed = new URL(SITE_URL);
		const incoming = new URL(origin);
		return incoming.origin === allowed.origin;
	} catch {
		return false;
	}
}

function parseNotifyEmails(value: string | undefined): string[] | undefined {
	if (!value?.trim()) return undefined;
	return value
		.split(',')
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	if (request.method !== 'POST') {
		return json({ error: 'Method not allowed.' }, { status: 405 });
	}

	if (!isAllowedOrigin(request)) {
		return json({ error: 'Invalid request origin.' }, { status: 403 });
	}

	const contentLength = Number(request.headers.get('content-length') ?? '0');
	if (contentLength > MAX_BODY_BYTES) {
		return json({ error: 'Request too large.' }, { status: 413 });
	}

	const resendApiKey = env.RESEND_API_KEY;
	const fromEmail = env.CONTACT_FROM_EMAIL ?? 'Ibraheem Uthman <hello@ibraheemuthman.com>';

	if (!resendApiKey) {
		console.error('RESEND_API_KEY is not configured.');
		return json({ error: 'Contact form is temporarily unavailable.' }, { status: 503 });
	}

	const clientIp = getClientIp(request, getClientAddress);
	if (!checkRateLimit(clientIp)) {
		return json(
			{ error: 'Too many messages sent. Please wait a few minutes and try again.' },
			{ status: 429 }
		);
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const parsed = parseContactPayload(body);
	if (!parsed.success) {
		return json({ error: parsed.error }, { status: 400 });
	}

	if (!isFormTimingValid(parsed.data.formLoadedAt)) {
		return json({ error: 'Please take a moment to complete the form before submitting.' }, { status: 400 });
	}

	try {
		await sendContactEmails({
			resendApiKey,
			fromEmail,
			notifyEmails: parseNotifyEmails(env.CONTACT_NOTIFY_EMAILS),
			name: parsed.data.name,
			email: parsed.data.email,
			phone: parsed.data.phone,
			message: parsed.data.message
		});
	} catch (error) {
		console.error('Contact form email failed:', error);
		return json({ error: 'Unable to send your message right now. Please try again later.' }, { status: 502 });
	}

	return json({ ok: true }, {
		headers: {
			'Cache-Control': 'no-store',
			'X-Content-Type-Options': 'nosniff'
		}
	});
};
