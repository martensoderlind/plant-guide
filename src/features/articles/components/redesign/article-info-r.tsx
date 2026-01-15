import { Clock, Eye } from "lucide-react";
import { Article } from "../../schema";
import ArticleLikeButton from "../article-like-button";
import AuthorHeaderR from "./author-header-r";
import ArticleMetric from "./article-metrics";

type Props = {
  article: Article;
};

export default function ArticleInfoR({ article }: Props) {
  const date = article.updated_at
    ? new Date(article.updated_at)
    : new Date(article.created_at);
  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 pl-2 flex flex-row md:flex-col">
      <div>
        {article.author_id && (
          <AuthorHeaderR id={article.author_id} updated_at={date} />
        )}
      </div>
      <div className="mb-4 text-sm text-gray-500 my-2">
        <div className="flex flex-row md:flex-col md:space-y-2 space-x-4 md:space-x-0">
          <ArticleMetric
            header="Reading time"
            text={`${article.reading_time_minutes} min`}
            icon={<Clock size={16} />}
          />
          <ArticleMetric
            header="views"
            text={`${article.views}`}
            icon={<Eye size={16} />}
          />
        </div>
        <ArticleLikeButton
          likes={article.likes ? article.likes : 0}
          id={article.id}
          slug={article.slug}
        />
      </div>
    </aside>
  );
}
