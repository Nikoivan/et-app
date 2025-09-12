type UserEntity = {
  id: number;
  login: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

type PostStatus = 'legacy' | 'fresh';

export type PostEntity = {
  id: number;
  title: string;
  description: string;
  content: string;
  user: UserEntity;
  postAuthorId: number;
  type: string;
  guid: string;
  image: string;
  status: PostStatus;
  route: string;
  categories: string[];
  metaTitle?: string;
  metaDescription?: string;
  link?: string;
  pubDate?: string;
};
