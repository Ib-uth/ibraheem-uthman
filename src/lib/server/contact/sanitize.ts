const HTML_TAG = /<[^>]*>/g;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const MULTI_SPACE = /\s+/g;

export function stripHtml(value: string): string {
	return value.replace(HTML_TAG, '');
}

export function normalizeField(value: string): string {
	return stripHtml(value).replace(CONTROL_CHARS, '').replace(MULTI_SPACE, ' ').trim();
}

export function normalizeMessage(value: string): string {
	return stripHtml(value)
		.replace(CONTROL_CHARS, '')
		.replace(/\r\n/g, '\n')
		.trim();
}
