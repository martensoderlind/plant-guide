import { Edit3, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { Article } from "../../types";
import AdminArticleButtons from "./admin-article.buttons";
import AdminArticleRow from "./admin-article-row";

type Props = {
  article: Article[];
};
export default function AdminArticleContainer({ article }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Article
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Views
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {article.map((article, idx) => (
            <AdminArticleRow key={idx} article={article} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
