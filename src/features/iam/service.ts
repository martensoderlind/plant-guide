import { v4 as uuidv4 } from "uuid";
import { Db } from "@/db";
import createIamRepository from "./repository";
import { NewUser } from "./types";

export default function createIamService(db: Db) {
  const repository = createIamRepository(db);
  return {
    async getAllUsers() {
      const users = await repository.getAllUsers();
      return users;
    },
    async getUserRoles() {
      const roles = await repository.getUserRoles();
      return roles;
    },
    async createUser(newUser: NewUser) {
      const id = uuidv4();
      if (newUser.roleId !== undefined) {
        const result = await repository.createUser({
          ...newUser,
          id,
          roleId: newUser.roleId,
        });
        return result;
      } else {
        const roleId = await this.getRoleId(newUser.role);
        const result = await repository.createUser({ ...newUser, id, roleId });
        return result;
      }
    },
    async deleteUser(id: string) {
      const result = await repository.deleteUser(id);
      return result;
    },
    async getRoleId(role: string) {
      const roleId = repository.getRoleId(role);
      return roleId;
    },
    async UpdateUserRole(id: string, roleId: string) {
      const result = repository.updateUserRole(id, roleId);
    },
  };
}
