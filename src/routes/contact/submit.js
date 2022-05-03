import 'dotenv/config';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function get() {
  const items = [
    {a: 1, b: 2},
    {a: 3, b: 4},
    {a: 5, b: 6},
  ];
  return {
    body: items
  };
}
 
export async function post({ request }) {
  const body = await request.json();
  const { HCAPTCHA_SECRET, FORM_FROM_EMAIL, FORM_TO_EMAIL } = process.env;

  const captchaVerified = await fetch(`https://hcaptcha.com/siteverify?response=${body.captchaToken}&secret=${HCAPTCHA_SECRET}`, {
    method: 'POST',
  })
    .then((res) => res.json())
    .then((json) => json.success)
    .catch(() => false);

  if (!captchaVerified) {
    return {
      statusCode: 400,
      body: {
        error: 'Captcha verification failed',
      },
    };
  }

  const msg = {
    to: FORM_TO_EMAIL,
    from: FORM_FROM_EMAIL,
    subject: `Form Submission from ${body.name}`,
    text: `
      Name: ${body.name}
      Email: ${body.email}
      Message: ${body.message}
    `,
  };

  const messageSent = await sgMail
    .send(msg)
    .then(() => true)
    .catch((error) => {
      console.error(error);
      return false;
    });

  if (!messageSent) {
    return {
      statusCode: 500,
      body: {
        error: 'Message could not be sent',
      },
    };
  }

  return {
    body: {
      success: true,
    },
  };
}
