import { NextApiRequest, NextApiResponse } from 'next';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.SENDGRID_API_KEY) {
    return res.status(503).json({ message: 'Email service is not configured.' });
  }

  const { name, email, tel, message } = req.body;

  if (!name) {
    return res.status(422).json({ error: 'Please provide your name' });
  }
  if (!email && !tel) {
    return res.status(422).json({ error: 'Please provide an email or phone number' });
  }
  if (!message) {
    return res.status(422).json({ error: 'Tell us something, like "I want to know more"' });
  }

  try {
    const response = await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: process.env.RECEIVING_EMAIL || 'gojukebox@gmail.com' }],
            subject: `[FLY5] New message from ${name}`,
          },
        ],
        from: {
          email: 'me@lacymorrow.com',
          name: 'FLY5',
        },
        reply_to: email ? { email, name } : undefined,
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New contact from FLY5</h2>
              <p><b>Name:</b> ${name}</p>
              ${email ? `<p><b>Email:</b> ${email}</p>` : ''}
              ${tel ? `<p><b>Phone:</b> ${tel}</p>` : ''}
              <p><b>Message:</b></p>
              <p>${message}</p>
            `,
          },
        ],
      }),
    });

    if (response.status >= 200 && response.status < 300) {
      return res.status(200).json({
        message: 'Your message was sent, thanks for reaching out!',
      });
    }

    const errorBody = await response.text();
    console.error('[send-email] SendGrid error:', response.status, errorBody);
    return res.status(500).json({ message: 'Message failed to send.', _debug: { status: response.status, body: errorBody } });
  } catch (error) {
    console.error('[send-email]', error);
    return res.status(500).json({ message: 'Message failed to send.' });
  }
};

export default handler;
