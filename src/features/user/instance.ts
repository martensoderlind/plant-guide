import { db } from "@/db/index";
import createUserService from "./service";

export const iamService = createUserService(db);
