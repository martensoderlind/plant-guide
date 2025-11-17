import createUserService from "./service";

export type NewUser = {
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string | null;
  roleId?: string;
  role: string;
};
export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string | null;
  roleId: string;
  role?: string;
  created_at?: Date;
};
export type UpdateUser = Omit<
  User,
  "avatarUrl" | "roleId" | "role" | "created_at"
>;

export type Roles = {
  id: string;
  description: string;
};
export type Author = {
  fullName: string | null;
  username: string;
  avatarUrl: string | null;
};
type userService = ReturnType<typeof createUserService>;

export type UserService = {
  getAllUsers: userService["getAllUsers"];
  createUser: userService["createUser"];
  deleteUser: userService["deleteUser"];
  updateUserRole: userService["updateUserRole"];
  getUserRoles: userService["getUserRoles"];
  getArticleAuthor: userService["getArticleAuthor"];
  getUserCount: userService["getUserCount"];
  updateUser: userService["updateUser"];
};
