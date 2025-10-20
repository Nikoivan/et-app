import { Prisma } from '@prisma/client';

export const postCardFields: Prisma.PostSelect = {
  title: true,
  id: true,
  user: true,
  route: true,
  images: true,
  price: true,
  duration: true,
  metaPrice: true,
  metaDuration: true
};
