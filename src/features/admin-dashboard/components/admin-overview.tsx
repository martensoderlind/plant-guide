import { BookOpen, Eye, Leaf, TrendingUp } from "lucide-react";
import RecentActivity from "./recent-activity";
import {
  getArticleCount,
  getArticleViews,
  getPlantGuideCount,
  getPublishedArticleCount,
} from "../actions";
import ErrorMessage from "@/shared/components/error";

export default async function AdminOverview() {
  const totalPlants = await getPlantGuideCount();
  const totalArticles = await getArticleCount();
  const totalPublishedArticles = await getPublishedArticleCount();
  const articleViews = await getArticleViews();

  if (totalPlants.ok === false) {
    return <ErrorMessage message={totalPlants.error.message} />;
  }
  if (totalArticles.ok === false) {
    return <ErrorMessage message={totalArticles.error.message} />;
  }
  if (totalPublishedArticles.ok === false) {
    return <ErrorMessage message={totalPublishedArticles.error.message} />;
  }
  if (articleViews.ok === false) {
    return <ErrorMessage message={articleViews.error.message} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Plants</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalPlants.data}
              </p>
            </div>
            <Leaf className="h-12 w-12 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Articles
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {totalArticles.data}
              </p>
            </div>
            <BookOpen className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalPublishedArticles.data}
              </p>
            </div>
            <Eye className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">
                {articleViews.data.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>
      <RecentActivity />
    </div>
  );
}
