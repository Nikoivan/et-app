import { Role } from '@/entities/user/domain';

export const permissions: Record<string, Set<string>> = {
  dashboard: new Set([Role.GUIDE, Role.ADMIN, Role.SUPER_ADMIN]),
  createTour: new Set([Role.GUIDE, Role.SUPER_ADMIN])
};
