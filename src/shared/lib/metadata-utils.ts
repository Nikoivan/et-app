'use server';

import { Either } from '@/shared/lib/either';
import { Metadata } from 'next';

export async function getMetadataByEither<
  T extends Record<string, unknown> = {
    title: string;
    description: string;
    categories?: string[];
  }
>(either: Either<string, T>): Promise<Metadata> {
  if (
    either.type === 'left' ||
    typeof either.value.title !== 'string' ||
    typeof either.value.description !== 'string' ||
    !Array.isArray(either.value.categories)
  ) {
    return {
      title: `Заголовок страницы`,
      description: `Описание`
    };
  }

  return {
    title: either.value.title,
    description: either.value.description,
    keywords: either.value.categories
  };
}
