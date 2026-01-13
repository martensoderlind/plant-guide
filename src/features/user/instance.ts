import { db } from "@/db/index";
import createUserService from "./service";
import { securedService } from "../iam/secured-service";

export const insecureUserService = createUserService(db);

export const userService = securedService("user", insecureUserService);
