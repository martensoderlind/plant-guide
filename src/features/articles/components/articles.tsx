import { Suspense } from "react";
import ArticleContainer from "./article-container";
import Pagination from "@/shared/components/pagination";
import ContainerFallback from "../../../shared/components/container-fallback";
import { getArticleCount } from "../action";

type Props = {
  currentPage: number;
};

export default async function Articles({ currentPage }: Props) {
  const articleCount = await getArticleCount();

  if (articleCount.ok === false) {
    return (
      <div className="text-center text-red-500">Failed to load articles.</div>
    );
  }
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl mb-4 text-gray-900 leading-tight text-center">
          Articles
        </h1>
        <div className="relative z-10 p-8">
          <Suspense fallback={<ContainerFallback />}>
            <ArticleContainer currentPage={currentPage} />
          </Suspense>
        </div>
      </section>
      <Pagination totalPages={totalPages(articleCount.data)} />
    </div>
  );
}
