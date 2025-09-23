import { Suspense } from "react";
import ArticleContainer from "./article-container";
import Pagination from "@/components/pagination";
import { articlesService } from "../instance";

type Props = {
  currentPage: number;
};

export default async function Articles({ currentPage }: Props) {
  const articleCount = await articlesService.getArticleCount();
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
  return (
    <div>
      <section className="relative max-w-7xl mx-auto">
        <p className="font-bold text-3xl py-4">Articles</p>
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl ">
          <Suspense
            fallback={
              <div className="flex align-middle justify-center">
                <p className="text-2xl">Loading Articles..</p>
              </div>
            }
          >
            <ArticleContainer currentPage={currentPage} />
          </Suspense>
        </div>
        <Pagination totalPages={totalPages(articleCount)} />
      </section>
    </div>
  );
}
