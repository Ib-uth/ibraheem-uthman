export const CONTACT_LIMITS = {
	nameMin: 2,
	nameMax: 100,
	emailMax: 254,
	phoneMin: 7,
	phoneMax: 30,
	messageMin: 10,
	messageMax: 5000,
	minFillMs: 3_000,
	maxFillMs: 3_600_000
} as const;

export const RATE_LIMIT = {
	maxRequests: 5,
	windowMs: 15 * 60 * 1000
} as const;

export const DEFAULT_NOTIFY_EMAILS = [
	'hello@ibraheemuthman.com',
	'uthibraheem@gmail.com'
] as const;
