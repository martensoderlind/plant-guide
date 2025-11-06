import { UserService } from "@/features/user/types";
import { PermissionSchema } from "../types";

export const users: PermissionSchema<"plantGuides", UserService> = {
  getAllUsers: "plantGuides.getAllUsers",
  createUser: "plantGuides.createUser",
  deleteUser: "plantGuides.deleteUser",
  updateUserRole: "plantGuides.updateUserRole",
  getUserRoles: "plantGuides.getUserRoles",
  getArticleAuthor: "plantGuides.getArticleAuthor",
  getUserCount: "plantGuides.getUserCount",
  updateUser: "plantGuides.updateUser",
};
