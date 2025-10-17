import { v4 as uuidv4 } from "uuid";
import { Db } from "@/db";
import createIamRepository from "./repository";
import { NewUser, UpdateUser } from "./types";
import { iamService } from "./instance";

export default function createIamService(db: Db) {
  const repository = createIamRepository(db);
  return {
    async getAllUsers(currentPage: number) {
      const users = await repository.getAllUsers(currentPage);
      return users;
    },
    async getUserRoles() {
      const roles = await repository.getUserRoles();
      return roles;
    },
    async getUserCount() {
      const userCount = await repository.getUserCount();
      return userCount;
    },
    async getArticleAuthor(id: string) {
      return await repository.getArticleAuthor(id);
    },
    async createUser(newUser: NewUser) {
      let id: string;
      if (!newUser.id) {
        id = uuidv4();
      } else {
        id = newUser.id;
      }

      if (newUser.roleId !== undefined) {
        const result = await repository.createUser({
          ...newUser,
          id,
          roleId: newUser.roleId,
        });
        return result;
      } else {
        const roleId = await iamService.getRoleId(newUser.role);
        const result = await repository.createUser({
          ...newUser,
          id,
          roleId,
        });
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
    async updateUserRole(id: string, roleId?: string, role?: string) {
      if (roleId) {
        const result = await repository.updateUserRole(id, roleId);
        return result;
      }
      if (role) {
        const roleId = await repository.getRoleId(role);
        const result = await repository.updateUserRole(id, roleId);
        return result;
      }
    },
    async updateUser(user: UpdateUser) {
      const result = await repository.updateUser(user);
      return result;
    },
  };
}
