import createIamService from "./service";

export type NewUser = {
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  roleId: string;
};
export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  roleId: string;
};

type iamService = ReturnType<typeof createIamService>;

export type IamService = {
  getAllUsers: iamService["getAllUsers"];
  createUser: iamService["createUser"];
  deleteUser: iamService["deleteUser"];
  updateUserRole: iamService["UpdateUserRole"];
};
