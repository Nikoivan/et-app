import { cache } from 'react';
import { dbClient } from '@/shared/lib/db';

class LegacyPostRepository {
  getPostsList = cache(
    (): Promise<LegacyPostsListElement[]> => dbClient.legacyPosts.findMany()
  );

  createPostList = (
    command: CreateLegacyPostListElementCommand
  ): Promise<LegacyPostsListElement> =>
    dbClient.legacyPosts.create({ data: command });

  deleteLegacyPost = (command: DeleteLegacyPostListElementCommand) =>
    dbClient.legacyPosts.delete({ where: { id: command.id } });
}

export const legacyPostsRepository = new LegacyPostRepository();
