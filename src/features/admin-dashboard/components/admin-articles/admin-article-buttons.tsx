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
        className="text-gray-600 hover:text-gray-900"
        title="Edit"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <Link
        href={`/articles/${article.slug}`}
        className="text-gray-600 hover:text-gray-900"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={() => handleDeleteArticle(article.id)}
        className="text-gray-600 hover:text-gray-900"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {editFormOpen && (
        <EditArticleForm article={article} setEditFormOpen={setEditFormOpen} />
      )}
    </div>
  );
}
