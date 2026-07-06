import { z } from 'zod';
import { CONTACT_LIMITS } from './constants';
import { normalizeField, normalizeMessage } from './sanitize';

const namePattern = /^[\p{L}\p{M}' .-]+$/u;
const phonePattern = /^[+()\d\s.-]+$/;

export const contactPayloadSchema = z.object({
	name: z
		.string()
		.transform(normalizeField)
		.pipe(
			z
				.string()
				.min(CONTACT_LIMITS.nameMin, 'Name is too short.')
				.max(CONTACT_LIMITS.nameMax, 'Name is too long.')
				.regex(namePattern, 'Name contains invalid characters.')
		),
	email: z
		.string()
		.transform((value) => normalizeField(value).toLowerCase())
		.pipe(z.email('Please enter a valid email address.').max(CONTACT_LIMITS.emailMax)),
	phone: z
		.string()
		.transform(normalizeField)
		.pipe(
			z
				.string()
				.min(CONTACT_LIMITS.phoneMin, 'Phone number is too short.')
				.max(CONTACT_LIMITS.phoneMax, 'Phone number is too long.')
				.regex(phonePattern, 'Phone number contains invalid characters.')
		),
	message: z
		.string()
		.transform(normalizeMessage)
		.pipe(
			z
				.string()
				.min(CONTACT_LIMITS.messageMin, 'Message is too short.')
				.max(CONTACT_LIMITS.messageMax, 'Message is too long.')
		),
	company: z.string().max(0, 'Spam detected.'),
	formLoadedAt: z.coerce
		.number()
		.int()
		.positive('Invalid form timing.')
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export function parseContactPayload(input: unknown):
	| { success: true; data: ContactPayload }
	| { success: false; error: string } {
	const result = contactPayloadSchema.safeParse(input);
	if (!result.success) {
		const first = result.error.issues[0];
		return { success: false, error: first?.message ?? 'Invalid form data.' };
	}
	return { success: true, data: result.data };
}

export function isFormTimingValid(formLoadedAt: number, now = Date.now()): boolean {
	const elapsed = now - formLoadedAt;
	return elapsed >= CONTACT_LIMITS.minFillMs && elapsed <= CONTACT_LIMITS.maxFillMs;
}
