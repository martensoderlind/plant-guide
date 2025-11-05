import { Permission } from "./types";
import { checkAccess } from "./check-access";

export default function createIamService() {
  return {
    async checkAccess(permission: Permission, role: string[]) {
      return checkAccess(permission, role);
    },
  };
}
