// import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

const sendgrid = async (props: {
  name: string;
  email: string;
  tel?: string;
  subject?: string;
  message: string;
  [key: string]: any;
}) => {
  const {
    name, email, tel, subject, message, ...rest
  } = props;

  const body = {
    personalizations: [
      {
        to: [
          {
            email: 'lacymorrow0@gmail.com',
          },
        ],
        subject: `👻 [FLY5] ${name} ${subject ? `: ${subject}` : ''}`,
      },
    ],
    from: {
      email: 'me@lacymorrow.com',
      name: 'Lacy Morrow',
    },
    replyTo: {
      email,
      name,
    },
    content: [
      {
        type: 'text/html',
        value: `
          <p>Via <b>${name}</b>:</p>
          ${tel ? `<p>${tel}</p>` : ''}
          ${email ? `<p>${email}</p>` : ''}
          ${subject ? `<p>${subject}</p>` : ''}
          <p>${message}</p>
          ${Object.keys(rest).length === 0 ? `<p>${JSON.stringify(rest)}</p>` : ''}
        `,
      },
    ],
  };

  const data = await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  return data;
};

export default sendgrid;
