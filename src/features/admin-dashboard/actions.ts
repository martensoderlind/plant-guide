"use server";
import { revalidatePath } from "next/cache";
import Plant from "../homepage/components/plant";
import { adminDashboardServiceService } from "./instance";
import { Plants, NewPlant } from "./types";

export async function getAllPlantGuides() {
  const plants = await adminDashboardServiceService.getAllPlants();
  return plants;
}

export default async function addPlant(plant: NewPlant) {
  const message = await adminDashboardServiceService.addPlant(plant);
  revalidatePath("/admin-dashboard/plants");
  return message.message;
}
