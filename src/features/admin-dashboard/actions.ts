"use server";
import { revalidatePath } from "next/cache";
import Plant from "../homepage/components/plant";
import { adminDashboardService } from "./instance";
import { Plants, NewPlant } from "./types";

export async function getAllPlantGuides() {
  const plants = await adminDashboardService.getAllPlants();
  return plants;
}

export default async function addPlant(plant: NewPlant) {
  const message = await adminDashboardService.addPlant(plant);
  revalidatePath("/admin-dashboard/plants");
  return message.message;
}

export async function deletePlant(id: number) {
  await adminDashboardService.deletePlant(id);
  revalidatePath("/admin-dashboard/plants");
}
