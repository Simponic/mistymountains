import * as nodemailer from 'nodemailer';
import { continueRetryUntilValidation } from './retry';

export interface Mailer {
	sendMail(to: string, subject: string, message: string): Promise<boolean>;
}

export class MistyMountainsMailer implements Mailer {
	private from: string;
	private domain: string;
	private username: string;
	private password: string;
	private port: number;

	private transporter: nodemailer.Transporter;

	constructor(username: string, password: string, from: string, domain: string, port: number) {
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

	public async sendMail(to: string, subject: string, message: string) {
		const mail = {
			from: this.from,
			subject,
			html: message,
			to
		};

		return !!(await continueRetryUntilValidation<string>(async () => {
			const { messageId } = await this.transporter.sendMail(mail);
			return messageId;
		}));
	}
}

export const EnvMistyMountainsMailerFactory = () => {
	return new MistyMountainsMailer(
		process.env.SMTP_USERNAME,
		process.env.SMTP_PASSWORD,
		process.env.FROM_EMAIL,
		process.env.SMTP_SERVER,
		Number(process.env.SMTP_PORT)
	);
};
