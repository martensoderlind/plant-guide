import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { rolesTable, userRolesTable, usersTable } from "./schema";
import { NewUser, User } from "./types";

export default function createIamRepository(db: Db) {
  return {
    async createUser(newUser: User) {
      return await db.transaction(async (tx) => {
        await tx.insert(usersTable).values({
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          avatarUrl: newUser.avatarUrl,
        });

        await tx.insert(userRolesTable).values({
          userId: newUser.id,
          roleId: newUser.roleId,
        });

        return { success: true };
      });
    },
    async deleteUser(userId: string) {
      await db.delete(usersTable).where(eq(usersTable.id, userId));
      return { success: true };
    },
    async updateUserRole(userId: string, newRoleId: string) {
      const roleExists = await db
        .select()
        .from(rolesTable)
        .where(eq(rolesTable.id, newRoleId))
        .limit(1);
      if (!roleExists) {
        throw new Error(`Role '${newRoleId}' does not exist`);
      }
      await db
        .update(userRolesTable)
        .set({ roleId: newRoleId })
        .where(eq(userRolesTable.userId, userId));
      return { success: true };
    },
  };
}
