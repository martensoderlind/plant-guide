import { v4 as uuidv4 } from "uuid";
import { Db } from "@/db";
import createIamRepository from "./repository";
import { NewUser } from "./types";

export default function createIamService(db: Db) {
  const repository = createIamRepository(db);
  return {
    async createUser(newUser: NewUser) {
      const id = uuidv4();
      const result = await repository.createUser({ ...newUser, id });
      return result;
    },
  };
}
