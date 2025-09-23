import { articlesService } from "../instance";
import ArticleCard from "@/features/articles/components/article-card";

type Props = {
  currentPage: number;
};

export default async function ArticleContainer({ currentPage }: Props) {
  const articles = await articlesService.getAllPublishedArticles(currentPage);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </div>
  );
}
