import { env } from '$env/dynamic/private';
import { isAllowedOrigin } from './allowed-origins';
import { checkRateLimit } from './rate-limit';
import { isFormTimingValid, parseContactPayload } from './schema';
import { sendContactEmails } from './send';

const MAX_BODY_BYTES = 12_000;

export type ContactSubmissionResult =
	| { ok: true }
	| { ok: false; status: number; error: string };

function getClientIp(request: Request, getClientAddress: () => string): string {
	const cfIp = request.headers.get('cf-connecting-ip');
	if (cfIp) return cfIp;

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

function parseNotifyEmails(value: string | undefined): string[] | undefined {
	if (!value?.trim()) return undefined;
	return value
		.split(',')
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean);
}

function payloadFromFormData(formData: FormData): Record<string, unknown> {
	return {
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		message: formData.get('message'),
		company: formData.get('company') ?? '',
		formLoadedAt: formData.get('formLoadedAt')
	};
}

export async function handleContactSubmission(
	request: Request,
	getClientAddress: () => string,
	body?: unknown
): Promise<ContactSubmissionResult> {
	if (!isAllowedOrigin(request)) {
		return { ok: false, status: 403, error: 'Invalid request origin.' };
	}

	const contentLength = Number(request.headers.get('content-length') ?? '0');
	if (contentLength > MAX_BODY_BYTES) {
		return { ok: false, status: 413, error: 'Request too large.' };
	}

	const resendApiKey = env.RESEND_API_KEY;
	const fromEmail = env.CONTACT_FROM_EMAIL ?? 'Ibraheem Uthman <hello@ibraheemuthman.com>';

	if (!resendApiKey) {
		console.error('RESEND_API_KEY is not configured.');
		return { ok: false, status: 503, error: 'Contact form is temporarily unavailable.' };
	}

	const clientIp = getClientIp(request, getClientAddress);
	if (!checkRateLimit(clientIp)) {
		return {
			ok: false,
			status: 429,
			error: 'Too many messages sent. Please wait a few minutes and try again.'
		};
	}

	let payload: unknown = body;
	if (payload === undefined) {
		const contentType = request.headers.get('content-type') ?? '';
		if (contentType.includes('application/json')) {
			try {
				payload = await request.json();
			} catch {
				return { ok: false, status: 400, error: 'Invalid request body.' };
			}
		} else if (
			contentType.includes('multipart/form-data') ||
			contentType.includes('application/x-www-form-urlencoded')
		) {
			payload = payloadFromFormData(await request.formData());
		} else {
			return { ok: false, status: 415, error: 'Unsupported content type.' };
		}
	}

	const parsed = parseContactPayload(payload);
	if (!parsed.success) {
		return { ok: false, status: 400, error: parsed.error };
	}

	if (!isFormTimingValid(parsed.data.formLoadedAt)) {
		return {
			ok: false,
			status: 400,
			error: 'Please take a moment to complete the form before submitting.'
		};
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
		return {
			ok: false,
			status: 502,
			error: 'Unable to send your message right now. Please try again later.'
		};
	}

	return { ok: true };
}
