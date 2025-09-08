"use server";

import { revalidatePath } from "next/cache";
import { articlesService } from "./instance";

export async function incrementLikesAction(id: number, slug: string) {
  const result = await articlesService.incrementLikes(id);
  revalidatePath(`/articles/${slug}`);
}
