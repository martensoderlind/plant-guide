import AdminArticleContainer from "./admin-article-container";
import AdminArticleForm from "./admin-article-form";

export default function AdminArticles() {
  return (
    <div className="space-y-6">
      <AdminArticleForm />
      <AdminArticleContainer />
    </div>
  );
}
