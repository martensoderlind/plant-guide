"use client";
import { Heart } from "lucide-react";
import { Article } from "../schema";
import { incrementLikesAction } from "../action";

type Props = {
  article: Article;
};

export default function ArticleFooter({ article }: Props) {
  function incrementLikes(id: number, slug: string) {
    incrementLikesAction(id, slug);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <footer className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {article.updated_at && (
            <span>updated at: {formatDate(article.updated_at)}</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => incrementLikes(article.id, article.slug)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <Heart size={18} />
            <span>Like ({article.likes})</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
