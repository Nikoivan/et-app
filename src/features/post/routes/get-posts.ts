import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

import { Either } from '@/shared/lib/either';
import { postServices } from '@/features/post/services/post-services';
import { GetPostsResponse } from '@/features/post/domain';

export async function getPosts(req: NextRequest): Promise<Response> {
  try {
    const page = req.nextUrl.searchParams.get('page');

    const eitherResult: Either<string, GetPostsResponse> =
      await postServices.getPosts(page ? { page: Number(page) } : undefined);

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
