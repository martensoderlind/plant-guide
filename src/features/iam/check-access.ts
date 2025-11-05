import { rolesPermissions } from "./permissions";

export function checkAccess(permission: string, role: string) {
  // note: role as keyof typeof rolesPermissions is unsafe code
  const rolePermission = rolesPermissions[
    role as keyof typeof rolesPermissions
  ] as Set<string>;
  if (!rolePermission) {
    //update with proper error handling
    return false;
  }

  const hasPermission = rolePermission.has(permission);

  if (hasPermission) {
    return true;
  }

  //update with proper error handling
  return false;
}
