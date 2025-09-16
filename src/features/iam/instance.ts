import { db } from "@/db/index";
import createIamService from "./service";

export const iamService = createIamService(db);
