import { NextRequest } from 'next/server';

import { handleError } from '@/shared/lib/response-utils';
import { sessionService } from '@/entities/user/server';
import { roleUtils } from '@/entities/user';
import { postServices } from '../services/post-services';
import { Post } from '../../../../generated/prisma/client';

export async function getExportPosts(req: NextRequest): Promise<Response> {
  try {
    const cookies = req.cookies.get('session')?.value;

    if (!cookies) {
      return handleError({ body: 'Ошибка верификации' });
    }

    const { session } = await sessionService.verifySession(cookies);

    if (!session) {
      return handleError({ body: 'Ошибка верификации' });
    }

    if (!roleUtils.userHasPermissionOn(session.role, 'postsJsonFile')) {
      return handleError({ body: 'У вас нет полномочий на экспорт постов' });
    }

    const either = await postServices.getAllPosts();

    if (either.type === 'left') {
      return handleError({ body: either.error });
    }

    const posts: Post[] = either.value;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('[\n'));

        posts.forEach((post, index) => {
          const json = JSON.stringify(post, null, 2);
          const suffix = index < posts.length - 1 ? ',\n' : '\n';
          controller.enqueue(encoder.encode(json + suffix));
        });

        controller.enqueue(encoder.encode(']'));
        controller.close();
      }
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="posts.json"'
      }
    });
  } catch (e) {
    if (!!e && typeof e === 'object' && 'message' in e) {
      console.error(e.message);
    }

    return handleError({ body: 'Ошибка верификации' });
  }
}
