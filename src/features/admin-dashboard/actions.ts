"use server";
import { revalidatePath } from "next/cache";
import { adminDashboardService } from "./instance";
import { NewPlant, NewArticle } from "./types";

export async function getAllPlantGuides() {
  const plants = await adminDashboardService.getAllPlants();
  return plants;
}
export async function getAllArticles() {
  const plants = await adminDashboardService.getAllArticles();
  return plants;
}

export default async function addPlant(plant: NewPlant) {
  const message = await adminDashboardService.addPlant(plant);
  revalidatePath("/admin-dashboard/plants");
  return message;
}
export async function addArticle(article: NewArticle) {
  const message = await adminDashboardService.addArticle(article);
  revalidatePath("/admin-dashboard/articles");
  return message;
}

export async function deletePlant(id: number) {
  await adminDashboardService.deletePlant(id);
  revalidatePath("/admin-dashboard/plants");
}
