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
    async createUser(newUser: NewUser) {
      const id = uuidv4();
      const result = await repository.createUser({ ...newUser, id });
      return result;
    },
    async deleteUser(id: string) {
      const result = await repository.deleteUser(id);
      return result;
    },
    async UpdateUserRole(id: string, roleId: string) {
      const result = repository.updateUserRole(id, roleId);
    },
  };
}
