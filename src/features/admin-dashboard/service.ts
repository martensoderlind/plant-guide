import { Db } from "@/db";
import createAdminDashboardRepository from "./repository";

export default function createAdminDashboardService(db: Db) {
  const repository = createAdminDashboardRepository(db);
  return {
    getAllPlants() {
      return;
    },
  };
}
