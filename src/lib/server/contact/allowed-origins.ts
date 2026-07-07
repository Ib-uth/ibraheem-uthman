import { SITE_URL } from '$lib/constants/site';

const DEV_ORIGINS = ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173'];

/** Hostnames that may submit to the contact API (apex + www). */
export function getAllowedOrigins(): string[] {
	const origins = new Set<string>();

	try {
		const canonical = new URL(SITE_URL);
		origins.add(canonical.origin);

		const host = canonical.hostname;
		if (host.startsWith('www.')) {
			origins.add(`${canonical.protocol}//${host.slice(4)}`);
		} else {
			origins.add(`${canonical.protocol}//www.${host}`);
		}
	} catch {
		origins.add('https://www.ibraheemuthman.com');
		origins.add('https://ibraheemuthman.com');
	}

	if (import.meta.env.DEV) {
		for (const origin of DEV_ORIGINS) {
			origins.add(origin);
		}
	}

	return [...origins];
}

export function isAllowedOrigin(request: Request): boolean {
	const origin = request.headers.get('origin');
	if (!origin) return true;

	return getAllowedOrigins().includes(origin);
}

export function corsHeaders(request: Request): Record<string, string> {
	const origin = request.headers.get('origin');
	if (!origin || !isAllowedOrigin(request)) {
		return {};
	}

	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Accept',
		Vary: 'Origin'
	};
}
