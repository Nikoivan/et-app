import {
  deletePost,
  getPosts,
  patchPosts,
  postPosts
} from '@/features/post/server';

export const GET = getPosts;
export const POST = postPosts;
export const DELETE = deletePost;
export const PATCH = patchPosts;
