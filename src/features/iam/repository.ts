import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { rolesTable, userRolesTable, usersTable } from "./schema";

export default function createIamRepository(db: Db) {
  return {
    async createUser({
      id,
      email,
      username,
      fullName,
      avatarUrl,
      roleId = "user", // default: vanlig användare
    }: {
      id: string;
      email: string;
      username: string;
      fullName?: string;
      avatarUrl?: string;
      roleId?: string;
    }) {
      await db.insert(usersTable).values({
        id,
        email,
        username,
        fullName,
        avatarUrl,
      });

      await db.insert(userRolesTable).values({
        userId: id,
        roleId,
      });

      return { success: true };
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
