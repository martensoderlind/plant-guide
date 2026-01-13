import { UserService } from "@/features/user/types";
import { PermissionSchema } from "../types";

export const users: PermissionSchema<"users", UserService> = {
  getAllUsers: "users.getAllUsers",
  createUser: "users.createUser",
  deleteUser: "users.deleteUser",
  updateUserRole: "users.updateUserRole",
  getUserRoles: "users.getUserRoles",
  getArticleAuthor: "users.getArticleAuthor",
  getUserCount: "users.getUserCount",
  updateUser: "users.updateUser",
};
