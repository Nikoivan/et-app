import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { z } from 'zod';

const otpSchema = z.object({
  tel: z
    .string()
    .regex(
      /^(?:\+7|7|8)[ -]?\(?(?:9\d{2})\)?(?:[ -]?\d){7}$/,
      'Неверный формат телефона'
    )
});

export async function postOtp(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();

    const bodyResult = otpSchema.safeParse(body);

    if (!bodyResult.success) {
      throw new Error('Ошибка валидации полученных данных');
    }

    return handleSuccess({ body: body });
  } catch (e) {
    console.error(e);

    return handleError({ body: 'Catch' });
  }
}
