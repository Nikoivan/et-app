import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

type MailData = {
  name: string;
  phone: string;
  description?: string;
};

const transport = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 587,
  secure: false,
  auth: {
    user: 'nixonivan-studio',
    pass: '2215081VfndtqYanus'
  }
});

console.log('transport', transport);

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
