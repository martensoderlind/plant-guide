import { articlesService } from "../instance";
import ArticleContainer from "./article-container";

export default async function Articles() {
  const articles = await articlesService.getAllPublishedArticles();
  return (
    <div>
      <ArticleContainer articles={articles} />
    </div>
  );
}
