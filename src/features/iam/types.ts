import createIamService from "./service";

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

export type Roles = {
  id: string;
  description: string;
};
type iamService = ReturnType<typeof createIamService>;

export type IamService = {
  getAllUsers: iamService["getAllUsers"];
  createUser: iamService["createUser"];
  deleteUser: iamService["deleteUser"];
  updateUserRole: iamService["UpdateUserRole"];
  getUserRoles: iamService["getUserRoles"];
};
