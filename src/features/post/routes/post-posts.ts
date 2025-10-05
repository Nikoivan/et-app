import { NextRequest } from 'next/server';

import { handleError, handleSuccess } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { roleUtils } from '@/entities/user';
import { postUtils } from '@/features/post/lib/post-utils';
import { postServices } from '@/features/post/services/post-services';
import z from 'zod';
import { legacyPostSchema } from '@/features/post/lib/validation-schemas';

export async function postPosts(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Ошибка верификации' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Ошибка верификации' });
    }

    if (!roleUtils.userHasPermissionOn(session.role, 'createPosts')) {
      return handleError({ body: 'У вас нет полномочий на создание постов' });
    }

    const hasJSONFile = !!req.nextUrl.searchParams.get('by_json');
    const dataSource = hasJSONFile ? await req.formData() : await req.json();
    const posts = await postUtils.getDataSourcePosts(dataSource, session.id);

    if (!posts.length) {
      return handleError({ body: 'Посты отсутствуют' });
    }

    const result = z.array(legacyPostSchema).safeParse(posts);

    console.log('result', result.error?.errors);

    const createResult = await postServices.createPosts(posts);

    return handleSuccess({
      body:
        createResult.type === 'right'
          ? `Успешно создано ${createResult.value.count} постов.`
          : 'Ну удалось создать посты.'
    });
  } catch (error) {
    return handleError({ error });
  }
}
