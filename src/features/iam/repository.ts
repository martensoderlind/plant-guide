import { Db } from "../../db/index";
import { eq } from "drizzle-orm";
import { rolesTable, userRolesTable, usersTable } from "./schema";
import { User } from "./types";

export default function createIamRepository(db: Db) {
  const pageSize = 6;
  return {
    async getAllUsers(currentPage: number) {
      const result = await db
        .select({
          id: usersTable.id,
          email: usersTable.email,
          username: usersTable.username,
          fullName: usersTable.fullName,
          avatarUrl: usersTable.avatarUrl,
          created_at: usersTable.createdAt,
          roleId: userRolesTable.roleId,
          role: rolesTable.description,
        })
        .from(usersTable)
        .leftJoin(userRolesTable, eq(usersTable.id, userRolesTable.userId))
        .leftJoin(rolesTable, eq(userRolesTable.roleId, rolesTable.id))
        .limit(pageSize)
        .offset((currentPage - 1) * pageSize);
      return result.map((row) => ({
        id: row.id,
        email: row.email,
        username: row.username,
        fullName: row.fullName || "",
        avatarUrl: row.avatarUrl || "",
        roleId: row.roleId || "",
        role: row.role || undefined,
        created_at: row.created_at,
      }));
    },
    async getUserRoles() {
      const roles = await db.select().from(rolesTable);
      return roles;
    },
    async getArticleAuthor(id: string) {
      const author = await db
        .select({
          fullName: usersTable.fullName,
          username: usersTable.username,
          avatarUrl: usersTable.avatarUrl,
        })
        .from(usersTable)
        .where(eq(usersTable.id, id));
      return author[0];
    },
    async getRoleId(role: string) {
      console.log("role:", role);
      const roleId = await db
        .select({ id: rolesTable.id })
        .from(rolesTable)
        .where(eq(rolesTable.description, role));

      return roleId[0].id;
    },
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

        return { success: true, message: "User created.", error: "" };
      });
    },
    async deleteUser(userId: string) {
      await db.delete(usersTable).where(eq(usersTable.id, userId));
      return { success: true, message: "user removed." };
    },
    async updateUserRole(userId: string, newRoleId: string) {
      const roleExists = await db
        .select()
        .from(rolesTable)
        .where(eq(rolesTable.id, newRoleId))
        .limit(1);
      if (!roleExists) {
        return {
          success: false,
          message: `Role '${newRoleId}' does not exist`,
        };
      }
      await db
        .update(userRolesTable)
        .set({ roleId: newRoleId })
        .where(eq(userRolesTable.userId, userId));
      return { success: true, message: "role updated" };
    },
  };
}
