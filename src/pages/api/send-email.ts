// Uses Sengrid to send email
import { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from '../../utils/sendEmail';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;
    await sendEmail({ name, email, phone, message });
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
