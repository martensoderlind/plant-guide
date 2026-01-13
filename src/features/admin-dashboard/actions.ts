"use server";
import { revalidatePath } from "next/cache";
import { adminDashboardService } from "./instance";
import { NewPlant, NewArticle } from "./types";
import { ArticleStatusEnums, UpdatedArticle } from "../articles/types";
import { NewUser, UpdateUser } from "../user/types";
import { Plant } from "../plant-guides/schema";
import { safeAction } from "@/shared/actions/safeActions";

export async function getAllPlantGuides(currentPage: number) {
  const plants = await adminDashboardService.getAllPlants(currentPage);
  return plants;
}
export async function getAllArticles(currentPage: number) {
  return safeAction(async () => {
    const plants = await adminDashboardService.getAllArticles(currentPage);
    return plants;
  });
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
  const result = await adminDashboardService.deleteUser(id);
  revalidatePath("/admin-dashboard/users");
  return result;
}

export async function updateUser(user: UpdateUser) {
  const result = await adminDashboardService.updateUser(user);
  revalidatePath("/admin-dashboard/users");
  return result;
}
export async function updatePlant(plant: Plant) {
  const result = await adminDashboardService.updatePlant(plant);
  revalidatePath("/admin-dashboard/plants");
  return result;
}
export async function updateArticle(updatedArticle: UpdatedArticle) {
  const result = await adminDashboardService.updateArticle(updatedArticle);
  revalidatePath("/admin-dashboard/plants");
  return result;
}
export async function updateStatus(id: number, newStatus: ArticleStatusEnums) {
  const result = await adminDashboardService.updateArticleStatus(id, newStatus);
  revalidatePath("/admin-dashboard/articles");
  return result;
}
export async function updateUserRole(id: string, newRole: string) {
  const result = await adminDashboardService.updateUserRole(id, newRole);
  revalidatePath("/admin-dashboard/users");
  return result;
}
export async function updatePlantFeaturedStatus(
  id: number,
  newStatus: boolean
) {
  await adminDashboardService.updatePlantFeaturedStatus(id, newStatus);
  revalidatePath("/admin-dashboard/plant-guides");
}

export async function getUserRoles() {
  return safeAction(async () => {
    const roles = await adminDashboardService.getUserRoles();
    return roles;
  });
}
export async function getUserCount() {
  return safeAction(async () => {
    const userCount = await adminDashboardService.getUserCount();
    return userCount;
  });
}
export async function getArticleCount() {
  return safeAction(async () => {
    const articleCount = await adminDashboardService.getArticleCount();
    return articleCount;
  });
}
export async function getAllUsers(currentPage: number) {
  return safeAction(async () => {
    const users = await adminDashboardService.getAllUsers(currentPage);
    return users;
  });
}

// Tag management actions
export async function getAllTags() {
  return safeAction(async () => {
    const tags = await adminDashboardService.getAllTags();
    return tags;
  });
}
export async function getArticleTags(id: number) {
  return await adminDashboardService.getArticleTags(id);
}
