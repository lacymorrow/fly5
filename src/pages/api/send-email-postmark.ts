import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'postmark';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    // Send an email:
    const postmarkClient = new Client(process.env.POSTMARK_TOKEN || '');

    // const client = new postmark.ServerClient(POSTMARK_TOKEN);

    await postmarkClient.sendEmail({
      From: 'me@lacymorrow.com',
      To: 'admin@lacymorrow.com',
      Subject: '👻 Yo from FLY5 ✔',
      HtmlBody: `<h1>Yo from FLY5</h1><p>Contact from ${name}</p><p>${phone} ${email}</p><p>${message}</p>`,
      TextBody: `Contact from ${name}: \r\n${phone} \r\n${email}\r\n${message}`,
      MessageStream: 'outbound',
    });

    return res
      .status(200)
      .json({ message: 'Your message was sent, thanks for reaching out  🚀' });
  }

  return res.status(404).json({
    error: {
      code: 'not_found',
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};

export default handler;
