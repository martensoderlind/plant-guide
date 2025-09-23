import { Suspense } from "react";
import AdminArticleContainer from "./admin-article-container";
import AdminArticleForm from "./admin-article-form";
import AdminDashboardFallback from "../admin-dashboard-fallback";
import Pagination from "@/components/pagination";

type Props = {
  currentPage: number;
  articleCount: number;
};

export default function AdminArticles({ currentPage, articleCount }: Props) {
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
  return (
    <div className="space-y-6">
      <AdminArticleForm />
      <Suspense
        fallback={
          <AdminDashboardFallback
            header={"All articles ( )"}
            tableHeaders={[
              "ARTICLE",
              "CATEGORY",
              "STATUS",
              "VIEWS",
              "CREATED",
              "ACTIONS",
            ]}
            emailPlaceHolder={false}
          />
        }
      >
        <AdminArticleContainer currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages(articleCount)} />
    </div>
  );
}
