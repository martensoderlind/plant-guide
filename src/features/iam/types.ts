import createIamService from "./service";

export type NewUser = {
  id?: string;
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
type iamService = ReturnType<typeof createIamService>;

export type IamService = {
  getAllUsers: iamService["getAllUsers"];
  createUser: iamService["createUser"];
  deleteUser: iamService["deleteUser"];
  updateUserRole: iamService["updateUserRole"];
  getUserRoles: iamService["getUserRoles"];
  getArticleAuthor: iamService["getArticleAuthor"];
  getUserCount: iamService["getUserCount"];
  updateUser: iamService["updateUser"];
};
