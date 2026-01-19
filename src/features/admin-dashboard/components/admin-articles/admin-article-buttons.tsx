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
    <div className="flex flex-col space-x-2">
      <button
        onClick={handleEditArticle}
        className="text-gray-600 hover:text-gray-900 flex items-center gap-2 group"
      >
        <Edit3 className="w-4 h-4" />
        <span className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Edit
        </span>
      </button>
      <Link
        href={`/articles/${article.slug}`}
        className="text-gray-600 hover:text-gray-900 flex items-center gap-2 group"
      >
        <Eye className="w-4 h-4" />
        <span className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          View
        </span>
      </Link>
      <button
        onClick={() => handleDeleteArticle(article.id)}
        className="text-gray-600 hover:text-gray-900 flex items-center gap-2 group"
      >
        <Trash2 className="w-4 h-4" />
        <span className="text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Delete
        </span>
      </button>
      {editFormOpen && (
        <EditArticleForm article={article} setEditFormOpen={setEditFormOpen} />
      )}
    </div>
  );
}
