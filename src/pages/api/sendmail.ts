import nodemailer from 'nodemailer';

import config from '../../utils/config';
// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (data: {
  name: string;
  tel?: string;
  email?: string;
  message: string;
}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${data.name}" <gojukebox@gmail.com>`, // sender address
    to: process.env.SMTP_USER, // list of receivers
    subject: '👻 Yo from FLY5 ✔', // Subject line
    text: `Contact from ${data.name}: \r\n${data.tel} \r\n${data.email}\r\n${data.message}`, // plain text body
    html: `<h1>Yo from FLY5</h1><p>Contact from ${data.name}</p><p>${data.tel} ${data.email}</p><p>${data.message}</p>`, // html body
  });

  return info;

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

const handler = (request: any, response: any) => {
  // console.log('[sendmail] Received request: ', request);
  if (!process.env.SMTP_PASS) {
    return response.status(500).json({ error: config.errorMessage });
  }
  if (!request?.body?.name) {
    // No name
    return response.status(422).json({ error: 'Please provide your name' });
  }
  if (!request?.body?.email && !request?.body?.tel) {
    // No contact info
    return response
      .status(422)
      .json({ error: 'Please provide an email or tel number' });
  }
  if (!request?.body?.message) {
    // No message
    return response
      .status(422)
      .json({ error: 'Tell us something, like "I want to know more"' });
  }

  sendMail({
    name: request.body.name,
    email: request.body.email,
    tel: request.body.tel,
    message: request.body.message,
  })
    .then((info) => {
      console.log('[sendmail] Message sent: %s', info.messageId);
    })
    .catch((error) => {
      console.error('[sendmail] Sending failed: %s', error);
      return response.status(500).json({ error: config.errorMessage });
    });
  return response
    .status(200)
    .json({ success: 'Your message was sent, thanks for reaching out  🚀' });
};

export default handler;
