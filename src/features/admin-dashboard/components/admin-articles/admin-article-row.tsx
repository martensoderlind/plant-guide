import { Article } from "@/features/articles/schema";
import AdminArticleButtons from "./admin-article.buttons";

type Props = {
  article: Article;
};

export default function AdminArticleRow({ article }: Props) {
  return (
    <tr key={article.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">
                {article.title}
              </div>
              {article.is_featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">{article.excerpt}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {article.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            article.status === "published"
              ? "bg-green-100 text-green-800"
              : article.status === "draft"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {article.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {article.views ? article.views.toLocaleString() : 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {article.created_at instanceof Date
          ? article.created_at.toDateString()
          : new Date(article.created_at).toDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <AdminArticleButtons id={article.id} slug={article.slug} />
      </td>
    </tr>
  );
}
