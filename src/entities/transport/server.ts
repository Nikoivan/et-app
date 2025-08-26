import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as process from 'node:process';

type MailData = {
  name: string;
  phone: string;
  description?: string;
};

console.log('login', process.env.EMAIL_LOGIN);
const transport = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN || '',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

export const sendMail = ({
  name,
  phone,
  description
}: MailData): Promise<SMTPTransport.SentMessageInfo> => {
  return transport.sendMail({
    from: 'Energy Tour App',
    to: 'infoenergytur@gmail.com',
    subject: 'Заявка на обратный звонок',
    text: `${name}: ${phone}. Дополнительный комментарий: ${description} `
  });
};
