import { AuthorArticleType } from "@/features/articles/types";

type Props = {
  article: AuthorArticleType;
};

export default async function AuthorArticle({ article }: Props) {
  return (
    <li className="p-4 rounded-xl hover:shadow transition bg-gray-50">
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
      </div>
    </li>
  );
}
