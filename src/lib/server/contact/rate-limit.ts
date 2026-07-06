import { RATE_LIMIT } from './constants';

type Bucket = {
	count: number;
	resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, now = Date.now()): boolean {
	const existing = buckets.get(key);

	if (!existing || now >= existing.resetAt) {
		buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
		return true;
	}

	if (existing.count >= RATE_LIMIT.maxRequests) {
		return false;
	}

	existing.count += 1;
	return true;
}

export function resetRateLimits(): void {
	buckets.clear();
}
