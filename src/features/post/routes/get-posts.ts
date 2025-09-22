import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

import { Either } from '@/shared/lib/either';
import { postServices } from '@/features/post/services/post-services';
import { PostDomain } from '@/entities/post/server';

export async function getPosts(req: NextRequest): Promise<Response> {
  try {
    const page = req.nextUrl.searchParams.get('page');

    const eitherResult: Either<string, PostDomain.PostEntity[]> =
      await postServices.getPosts(page ? { page: Number(page) } : undefined);

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
