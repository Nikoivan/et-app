import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { applicationFormSchema } from '@/features/application-form/model/schema';
import { resend } from '@/shared/lib/resend';
import { CallbackEmail } from '@/shared/ui/callback-email';

export async function postCallbackRequest(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const callbackDataResult = applicationFormSchema.safeParse(body);

    if (!callbackDataResult.success) {
      return handleError({ body: 'Данные формы не валидны' });
    }

    const { name, phone, description } = callbackDataResult.data;

    const createEmailResponse = await resend.emails.send({
      from: process.env.CALLBACK_FROM || '',
      to: process.env.CALLBACK_TO || '',
      subject: 'Новая заявка на обратный звонок',
      react: CallbackEmail({ name, phone, message: description }),
      text: ''
    });

    // обработка ответа
    console.log('createEmailResponse', createEmailResponse);

    return handleSuccess({
      body: 'Заявка успешно отправлена. Ожидайте обратного звонка'
    });
  } catch (e) {
    console.error(e);

    return handleError({
      body: 'Ошибка на сервере. Во время отправки заявки на обратный звонок.'
    });
  }
}
