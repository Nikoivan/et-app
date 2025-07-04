import { permissions } from '@/entities/user/constants/permissions';

function userHasPermissionOn(role: string, keyOfPermissions: string): boolean {
  return (
    !!keyOfPermissions &&
    keyOfPermissions in permissions &&
    permissions[keyOfPermissions].has(role)
  );
}

export const roleUtils = { userHasPermissionOn };
