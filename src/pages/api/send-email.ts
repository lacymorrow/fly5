import { NextApiRequest, NextApiResponse } from 'next';

import sendgrid from '../../utils/sendgrid';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!process.env.SENDGRID_API_KEY) {
    return res.status(503).json({ message: 'Email service is not configured.' });
  }

  try {
    const result = await sendgrid(req.body);

    if (result?.statusText === 'Accepted') {
      return res.status(200).json({
        ok: true,
        message: 'Your message was sent, thanks for reaching out  🚀',
      });
    }

    return res.status(502).json({ message: 'Message failed to send.' });
  } catch (error: any) {
    console.error('[send-email]', error);
    return res.status(500).json({ message: 'Message failed to send.' });
  }
};

export default handler;
