import { NextRequest } from 'next/server';
import { handleError, handleSuccess } from '@/shared/lib/response-utils';

import { postServices } from '@/features/post/services/post-services';
import { GetPostsResponse } from '@/features/post/domain';
import { searchParamsUtils } from '@/features/post/lib/search-params-utils';
import { Either } from '@/shared/lib/either';

export async function getPosts(req: NextRequest): Promise<Response> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const params = searchParamsUtils.getParamsBySearchParams(searchParams);

    const eitherResult: Either<string, GetPostsResponse> =
      await postServices.getPosts(params);

    if (eitherResult.type === 'left') {
      return handleError({ body: eitherResult.error });
    }

    return handleSuccess({ body: eitherResult.value });
  } catch {
    return handleError({ body: 'Ошибка верификации' });
  }
}
