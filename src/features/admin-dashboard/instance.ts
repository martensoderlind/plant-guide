import { db } from "@/db/index";
import createAdminDashboardService from "./service";

const articlesService = createAdminDashboardService(db);
