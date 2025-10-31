'use server';

import { Metadata } from 'next';

import { PostDomain } from '@/entities/post/server';
import { Either } from '@/shared/lib/either';

export async function getMetadataByEither(
  either: Either<string, PostDomain.PostMetaData>
): Promise<Metadata> {
  if (either.type === 'left') {
    return {
      title: `Заголовок страницы`,
      description: `Описание`
    };
  }

  return {
    title: either.value.title,
    description: either.value.description,
    keywords: either.value.keywords
  };
}
