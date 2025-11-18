import { Db } from "../../db/index";
import { eq, sql } from "drizzle-orm";
import { UpdateUser, User } from "./types";
import {
  authorProfilesTable,
  rolesTable,
  userRolesTable,
  usersTable,
} from "./schema";

export default function createUserRepository(db: Db) {
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
    async getUserRole(id: string) {
      const roleId = await db
        .select()
        .from(userRolesTable)
        .where(eq(userRolesTable.userId, id));
      if (roleId.length === 0) {
        return null;
      }
      const role = await db
        .select()
        .from(rolesTable)
        .where(eq(rolesTable.id, roleId[0].roleId));
      return role[0].description;
    },
    async getUserCount() {
      const userCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(usersTable);
      return userCount[0].count;
    },
    async getArticleAuthor(authorId: string) {
      const authorProfile = await db
        .select({
          authorId: authorProfilesTable.id,
          userId: usersTable.id,
          username: usersTable.username,
          fullName: usersTable.fullName,
          avatarUrl: usersTable.avatarUrl,
        })
        .from(authorProfilesTable)
        .innerJoin(usersTable, eq(authorProfilesTable.userId, usersTable.id))
        .where(eq(authorProfilesTable.id, authorId));
      if (authorProfile.length === 0) {
        return undefined;
      }
      return authorProfile[0];
    },
    async getRoleId(role: string) {
      const roleId = await db
        .select({ id: rolesTable.id })
        .from(rolesTable)
        .where(eq(rolesTable.description, role));

      return roleId[0].id;
    },
    async getAuthorId(authorId: string) {
      const author = await db
        .select({ id: authorProfilesTable.id })
        .from(authorProfilesTable)
        .where(eq(authorProfilesTable.userId, authorId));

      if (author.length > 0) {
        return author[0].id;
      }
      return undefined;
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
    async updateUser(user: UpdateUser) {
      await db
        .update(usersTable)
        .set({
          fullName: user.fullName,
          email: user.email,
          username: user.username,
        })
        .where(eq(usersTable.id, user.id));

      // update error handling
      return { success: true, message: "role updated" };
    },
  };
}
