"use server";
import { revalidatePath } from "next/cache";
import { adminDashboardService } from "./instance";
import { NewPlant, NewArticle } from "./types";
import { ArticleStatusType } from "../articles/types";
import { NewUser } from "../iam/types";

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
  const result = await adminDashboardService.addArticle(article);
  revalidatePath("/admin-dashboard/articles");
  return result;
}
export async function addUser(user: NewUser) {
  const result = await adminDashboardService.addUser(user);
  console.log("error:", result);
  revalidatePath("/admin-dashboard/users");
  return result;
}

export async function deletePlant(id: number) {
  await adminDashboardService.deletePlant(id);
  revalidatePath("/admin-dashboard/plants");
}

export async function deleteArticle(id: number) {
  await adminDashboardService.deleteArticle(id);
  revalidatePath("/admin-dashboard/articles");
}
export async function deleteUser(id: string) {
  await adminDashboardService.deleteUser(id);
  revalidatePath("/admin-dashboard/users");
}

export async function updateStatus(id: number, newStatus: ArticleStatusType) {
  await adminDashboardService.updateArticleStatus(id, newStatus);
  revalidatePath("/admin-dashboard/articles");
}
