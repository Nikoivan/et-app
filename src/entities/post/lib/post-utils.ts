import { PostStatus } from '@/entities/post/domain';

const getValidStatus = (value: string): PostStatus =>
  value === 'legacy' || value === 'fresh' ? value : 'unknown';

export const postUtils = { getValidStatus };
