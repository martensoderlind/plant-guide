import { AuthorArticleType } from "@/features/articles/types";
import Link from "next/link";

type Props = {
  article: AuthorArticleType;
};

export default async function AuthorArticle({ article }: Props) {
  return (
    <li className="p-4 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{article.title}</h3>
      {article.excerpt && (
        <p className="text-gray-600 mt-1">{article.excerpt}</p>
      )}

      <div className="text-sm text-gray-500 mt-2 flex gap-4">
        <span>Category: {article.category}</span>
        <span>Level: {article.difficulty_level}</span>
        {article.published_at && (
          <span>Published: {article.published_at.toLocaleDateString()}</span>
        )}
        <Link
          href={`/articles/${article.slug}`}
          className="hover:text-gray-900 ml-auto"
        >
          <p>Go to article →</p>
        </Link>
      </div>
    </li>
  );
}
