import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { applicationFormSchema } from '@/features/application-form/model/schema';
import { sendMail } from '@/entities/transport/server';

export async function postCallbackRequest(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const callbackDataResult = applicationFormSchema.safeParse(body);

    if (!callbackDataResult.success) {
      return handleError({ body: 'Данные формы не валидны' });
    }

    const sendResult = await sendMail(callbackDataResult.data);

    console.log('sendResult', sendResult);

    return handleSuccess({
      body: 'Заявка успешно отправлена. Ожидайте обратного звонка'
    });
  } catch (e) {
    console.log(e);

    return handleError({
      body: 'Ошибка на сервере. Во время отправки заявки на обратный звонок.'
    });
  }
}
