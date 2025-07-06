import { DASHBOARD_ACCESSED_ROLES } from '@/features/dashboard/constants/dashboard-accessed-roles';

function userHasPermissionsToDashboard(userRole: string): boolean {
  return DASHBOARD_ACCESSED_ROLES.has(userRole);
}

export const permissionsServices = { userHasPermissionsToDashboard };
