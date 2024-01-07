import 'dotenv/config';
import { EnvMistyMountainsMailerFactory } from '$lib/utils';

export async function post({ request }) {
	const body = await request.json();
	const { HCAPTCHA_SECRET, FORM_TO_EMAIL } = process.env;
	const mailer = EnvMistyMountainsMailerFactory();

	const captchaVerified = await fetch(
		`https://hcaptcha.com/siteverify?response=${body.captchaToken}&secret=${HCAPTCHA_SECRET}`,
		{
			method: 'POST'
		}
	)
		.then((res) => res.json())
		.then((json) => json.success)
		.catch(() => false);

	if (!captchaVerified) {
		return {
			statusCode: 400,
			body: {
				error: 'Captcha verification failed'
			}
		};
	}

	const text = `Name: ${body.name}
Phone Number: ${body.phone || 'Not Given'}
Email: ${body.email}
Message: ${body.message}
`;

	const messageSent = await mailer
		.sendMail(FORM_TO_EMAIL, `Form Submission from ${body.name}`, text)
		.then(() => true)
		.catch((error) => {
			console.error(error);
			return false;
		});

	if (!messageSent) {
		return {
			statusCode: 500,
			body: {
				error: 'Message could not be sent'
			}
		};
	}

	return {
		body: {
			success: true
		}
	};
}
