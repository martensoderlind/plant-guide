import { getAllArticles } from "../../actions";
import AdminArticleRow from "./admin-article-row";
import AdminArticleTableHeaders from "./admin-article-table-headers";

type Props = {
  currentPage: number;
};

export default async function AdminArticleContainer({ currentPage }: Props) {
  const articles = await getAllArticles(currentPage);
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          All Articles ({articles.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <AdminArticleTableHeaders />
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article, idx) => (
              <AdminArticleRow key={idx} article={article} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
