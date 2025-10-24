import { Role } from '@/entities/user/domain';

const admins = new Set([Role.SUPER_ADMIN, Role.ADMIN]);

export const permissions: Record<string, Set<string>> = {
  dashboard: new Set([Role.GUIDE, Role.ADMIN, Role.SUPER_ADMIN]),
  createTour: new Set([Role.GUIDE, Role.SUPER_ADMIN]),
  createActivity: new Set([Role.GUIDE, Role.SUPER_ADMIN]),
  createPosts: admins,
  editPosts: admins,
  deletePost: admins
};
