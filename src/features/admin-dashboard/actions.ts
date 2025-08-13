import Plant from "../homepage/components/plant";
import { adminDashboardServiceService } from "./instance";

export async function getAllPlantGuides() {
  const plants = await adminDashboardServiceService.getAllPlants();

  return plants;
}
