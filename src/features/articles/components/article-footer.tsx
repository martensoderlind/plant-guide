import { Article } from "../schema";
import AuthorHeader from "./author-header";
import ArticleLikeButton from "./article-like-button";

type Props = {
  article: Article;
};

export default function ArticleFooter({ article }: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <footer className="mt-8 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {article.updated_at && (
            <span>updated at: {formatDate(article.updated_at)}</span>
          )}
        </div>

        <ArticleLikeButton
          likes={article.likes ? article.likes : 0}
          id={article.id}
          slug={article.slug}
        />
      </div>
      <div className="flex items-center pb-2">
        {article.author_id && (
          <div className="text-sm text-gray-500 flex flex-row items-center">
            Author:
            <span>
              {article.author_id && <AuthorHeader id={article.author_id} />}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}
