"use server";

import { revalidatePath } from "next/cache";
import { articlesService } from "./instance";
import { safeAction } from "@/shared/actions/safeActions";

export async function incrementLikesAction(id: number, slug: string) {
  const result = await articlesService.incrementLikes(id);
  revalidatePath(`/articles/${slug}`);
  return result;
}

export async function getArticleCount() {
  return safeAction(async () => {
    const result = await articlesService.getArticleCount();
    return result;
  });
}
