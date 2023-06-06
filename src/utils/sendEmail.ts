// import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const sendEmail = async ({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      Authorization: `Bearer ${'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'}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: process.env.RECEIVING_EMAIL || 'lacymorrow0@gmail.com',
            },
          ],
          subject: '👻 Yo from FLY5 ✔',
        },
      ],
      from: {
        email: 'yo@fly5.live',
        name: `★ FLY5`,
      },
      content: [
        {
          type: 'text/html',
          value: `<p><b>${name}</b> just said:</p><p>${message}</p><p>${email}</p><p>${phone}</p>`,
        },
      ],
    }),
  });
};

export { sendEmail };
