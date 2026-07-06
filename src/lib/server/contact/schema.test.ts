import { describe, expect, it } from 'vitest';
import { CONTACT_LIMITS } from './constants';
import { isFormTimingValid, parseContactPayload } from './schema';
import { normalizeField, normalizeMessage, stripHtml } from './sanitize';
import { checkRateLimit, resetRateLimits } from './rate-limit';
import { ownerNotificationEmail, senderConfirmationEmail } from './email-templates';

const validPayload = {
	name: 'Ada Lovelace',
	email: 'ada@example.com',
	phone: '+234 801 234 5678',
	message: 'I would like to discuss a security assessment for our platform.',
	company: '',
	formLoadedAt: Date.now() - 5_000
};

describe('sanitize', () => {
	it('strips html and control characters', () => {
		expect(stripHtml('<b>Hello</b>')).toBe('Hello');
		expect(normalizeField('  Ada\u0000 Lovelace  ')).toBe('Ada Lovelace');
		expect(normalizeMessage('Line one\r\nLine two')).toBe('Line one\nLine two');
	});
});

describe('parseContactPayload', () => {
	it('accepts valid payloads', () => {
		const result = parseContactPayload(validPayload);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.email).toBe('ada@example.com');
		}
	});

	it('rejects honeypot submissions', () => {
		const result = parseContactPayload({ ...validPayload, company: 'Acme Corp' });
		expect(result.success).toBe(false);
	});

	it('rejects invalid emails', () => {
		const result = parseContactPayload({ ...validPayload, email: 'not-an-email' });
		expect(result.success).toBe(false);
	});

	it('rejects short messages', () => {
		const result = parseContactPayload({ ...validPayload, message: 'Hi' });
		expect(result.success).toBe(false);
	});
});

describe('isFormTimingValid', () => {
	it('requires a minimum fill time', () => {
		const now = 10_000;
		expect(isFormTimingValid(now - CONTACT_LIMITS.minFillMs, now)).toBe(true);
		expect(isFormTimingValid(now - 500, now)).toBe(false);
	});

	it('rejects stale form tokens', () => {
		const now = 10_000_000;
		expect(isFormTimingValid(now - CONTACT_LIMITS.maxFillMs - 1, now)).toBe(false);
	});
});

describe('checkRateLimit', () => {
	it('blocks repeated submissions in the same window', () => {
		resetRateLimits();
		const key = '127.0.0.1';
		expect(checkRateLimit(key, 1_000)).toBe(true);
		expect(checkRateLimit(key, 1_001)).toBe(true);
		expect(checkRateLimit(key, 1_002)).toBe(true);
		expect(checkRateLimit(key, 1_003)).toBe(true);
		expect(checkRateLimit(key, 1_004)).toBe(true);
		expect(checkRateLimit(key, 1_005)).toBe(false);
	});
});

describe('email templates', () => {
	it('renders owner and confirmation emails', () => {
		const fields = {
			name: 'Ada Lovelace',
			email: 'ada@example.com',
			phone: '+234 801 234 5678',
			message: 'Need help with a secure CI/CD rollout.'
		};

		const owner = ownerNotificationEmail(fields);
		const confirmation = senderConfirmationEmail(fields);

		expect(owner.subject).toContain('Ada Lovelace');
		expect(owner.html).toContain('#12181f');
		expect(confirmation.html).toContain('will get back to you shortly');
	});
});
