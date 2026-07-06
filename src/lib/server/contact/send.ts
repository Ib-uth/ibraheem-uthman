import { Resend } from 'resend';
import { SITE_EMAIL } from '$lib/constants/site';
import { DEFAULT_NOTIFY_EMAILS } from './constants';
import {
	ownerNotificationEmail,
	senderConfirmationEmail,
	type ContactEmailFields
} from './email-templates';

type SendContactEmailsInput = ContactEmailFields & {
	resendApiKey: string;
	fromEmail: string;
	notifyEmails?: string[];
};

export async function sendContactEmails(input: SendContactEmailsInput): Promise<void> {
	const resend = new Resend(input.resendApiKey);
	const notifyEmails = input.notifyEmails?.length ? input.notifyEmails : [...DEFAULT_NOTIFY_EMAILS];
	const ownerEmail = ownerNotificationEmail(input);
	const confirmationEmail = senderConfirmationEmail(input);

	const [ownerResult, confirmationResult] = await Promise.all([
		resend.emails.send({
			from: input.fromEmail,
			to: notifyEmails,
			replyTo: input.email,
			subject: ownerEmail.subject,
			html: ownerEmail.html
		}),
		resend.emails.send({
			from: input.fromEmail,
			to: input.email,
			replyTo: SITE_EMAIL,
			subject: confirmationEmail.subject,
			html: confirmationEmail.html
		})
	]);

	if (ownerResult.error) {
		throw new Error(ownerResult.error.message);
	}

	if (confirmationResult.error) {
		throw new Error(confirmationResult.error.message);
	}
}
