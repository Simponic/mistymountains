import 'dotenv/config';
import * as nodemailer from 'nodemailer';
import { continueRetryUntilValidation } from '$lib/utils';

class MistyMountainsMailer {
	constructor(username, password, from, domain, port) {
		this.from = from;
		this.username = username;
		this.password = password;
		this.domain = domain;
		this.port = port;

		this.transporter = nodemailer.createTransport({
			host: this.domain,
			port: this.port,
			auth: {
				user: this.username,
				pass: this.password
			},
			requireTLS: true,
			tls: {
				rejectUnauthorized: true
			}
		});
	}

	async sendMail(to, subject, message) {
		const mail = {
			from: this.from,
			subject,
			html: message,
			to
		};

		return !!(await continueRetryUntilValidation(async () => {
			const { messageId } = await this.transporter.sendMail(mail);
			return messageId;
		}));
	}
}

export async function post({ request }) {
	const body = await request.json();
	const { HCAPTCHA_SECRET, FORM_TO_EMAIL } = process.env;
	const mailer = new MistyMountainsMailer(
		process.env.SMTP_USERNAME,
		process.env.SMTP_PASSWORD,
		process.env.FROM_EMAIL,
		process.env.SMTP_SERVER,
		Number(process.env.SMTP_PORT)
	);

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

	const text = `<p>New MMT Message</h1>
<p>Name: ${body.name}</p>
<p>Phone Number: ${body.phone || 'Not Given'}</p>
<p>Email: ${body.email}</p>
<hr>
<br>
<p>${body.message}</p>`;

	const messageSent = await mailer
		.sendMail(FORM_TO_EMAIL, `[MMT-FORM]: New Message From ${body.name}`, text)
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
