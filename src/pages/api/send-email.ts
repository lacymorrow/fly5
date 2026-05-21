import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
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
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'FLY5 <noreply@shipkit.io>',
        to: process.env.RECEIVING_EMAIL || 'gojukebox@gmail.com',
        reply_to: email || undefined,
        subject: `[FLY5] New message from ${name}`,
        html: `
          <h2>New contact from FLY5</h2>
          <p><b>Name:</b> ${name}</p>
          ${email ? `<p><b>Email:</b> ${email}</p>` : ''}
          ${tel ? `<p><b>Phone:</b> ${tel}</p>` : ''}
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[send-email]', error);
      return res.status(500).json({ message: 'Message failed to send.', debug: error });
    }

    return res.status(200).json({
      message: 'Your message was sent, thanks for reaching out!',
    });
  } catch (error) {
    console.error('[send-email]', error);
    return res.status(500).json({ message: 'Message failed to send.' });
  }
};

export default handler;
