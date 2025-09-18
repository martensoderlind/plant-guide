import { Suspense } from "react";
import AdminArticleContainer from "./admin-article-container";
import AdminArticleForm from "./admin-article-form";
import AdminDashboardFallback from "../admin-dashboard-fallback";

export default function AdminArticles() {
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
        <AdminArticleContainer />
      </Suspense>
    </div>
  );
}
