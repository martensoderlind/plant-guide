"use client";
import { Edit3, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteArticle } from "../../actions";
import EditArticleForm from "./edit-form-article";
import { useState } from "react";
import { Article } from "@/features/articles/schema";

type Props = {
  article: Article;
};

export default function AdminArticleButtons({ article }: Props) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  function handleDeleteArticle(id: number) {
    deleteArticle(id);
  }

  function handleEditArticle() {
    setEditFormOpen(!editFormOpen);
  }
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleEditArticle}
        className="text-emerald-600 hover:text-emerald-900"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <Link
        href={`/articles/${article.slug}`}
        className="text-blue-600 hover:text-blue-900"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={() => handleDeleteArticle(article.id)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {editFormOpen && (
        <EditArticleForm article={article} setEditFormOpen={setEditFormOpen} />
      )}
    </div>
  );
}
