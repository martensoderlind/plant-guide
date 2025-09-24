"use client";

import { Heart } from "lucide-react";
import { incrementLikesAction } from "../action";
import { useState } from "react";

type Props = {
  id: number;
  slug: string;
  likes: number;
};

export default function ArticleLikeButton({ likes, id, slug }: Props) {
  const [articleLikes, setArticleLikes] = useState(likes);
  function incrementLikes(id: number, slug: string) {
    setArticleLikes(articleLikes + 1);
    incrementLikesAction(id, slug);
  }
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => incrementLikes(id, slug)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <Heart size={18} />
        <span>Like ({articleLikes})</span>
      </button>
    </div>
  );
}
