import { SITE_NAME, SITE_URL, THEME_COLOR } from '$lib/constants/site';

const palette = {
	dark: '#12181f',
	secondary: '#1c2733',
	mid: '#2f4a63',
	accent: '#7ea6c9',
	light: '#e8f0f7'
} as const;

type EmailShellOptions = {
	preview: string;
	title: string;
	bodyHtml: string;
};

function emailShell({ preview, title, bodyHtml }: EmailShellOptions): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${palette.light};color:${palette.dark};font-family:Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${palette.light};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border:1px solid ${palette.accent};">
          <tr>
            <td style="background-color:${palette.dark};padding:28px 32px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${palette.accent};">${escapeHtml(SITE_NAME)}</p>
              <h1 style="margin:0;font-size:24px;line-height:1.2;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${palette.light};">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;background-color:${palette.light};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:${palette.secondary};">
              <p style="margin:0;font-size:12px;line-height:1.6;color:${palette.light};">
                <a href="${SITE_URL}" style="color:${palette.accent};text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
	return `<p style="margin:0 0 18px;">
  <span style="display:block;margin-bottom:6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${palette.mid};">${escapeHtml(label)}</span>
  <span style="display:block;font-size:16px;line-height:1.5;color:${palette.dark};">${escapeHtml(value)}</span>
</p>`;
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

export type ContactEmailFields = {
	name: string;
	email: string;
	phone: string;
	message: string;
};

export function ownerNotificationEmail(fields: ContactEmailFields): { subject: string; html: string } {
	const bodyHtml = `
    ${fieldRow('Name', fields.name)}
    ${fieldRow('Email', fields.email)}
    ${fieldRow('Phone', fields.phone)}
    ${fieldRow('Message', fields.message)}
    <p style="margin:24px 0 0;padding-top:18px;border-top:1px solid ${palette.accent};font-size:13px;line-height:1.6;color:${palette.mid};">
      Reply directly to this sender from your inbox. This message was submitted through the contact form on ${escapeHtml(SITE_URL)}.
    </p>
  `;

	return {
		subject: `New contact form message from ${fields.name}`,
		html: emailShell({
			preview: `New message from ${fields.name}`,
			title: 'New contact message',
			bodyHtml
		})
	};
}

export function senderConfirmationEmail(fields: ContactEmailFields): { subject: string; html: string } {
	const bodyHtml = `
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:${palette.dark};">
      Hi ${escapeHtml(fields.name)}, thanks for reaching out. I received your message and will get back to you shortly.
    </p>
    ${fieldRow('Your message', fields.message)}
    <p style="margin:24px 0 0;padding:16px 18px;background-color:#ffffff;border-left:4px solid ${THEME_COLOR};font-size:14px;line-height:1.6;color:${palette.secondary};">
      If your note is urgent, you can also email me directly at
      <a href="mailto:hello@ibraheemuthman.com" style="color:${palette.mid};text-decoration:none;">hello@ibraheemuthman.com</a>.
    </p>
  `;

	return {
		subject: 'Thanks for contacting Ibraheem Uthman',
		html: emailShell({
			preview: 'I received your message and will respond shortly.',
			title: 'Message received',
			bodyHtml
		})
	};
}
