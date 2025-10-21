import { deletePost, getPosts, postPosts } from '@/features/post/server';

export const GET = getPosts;
export const POST = postPosts;
export const DELETE = deletePost;
