import { BookOpen, Eye, Leaf, TrendingUp } from "lucide-react";
import RecentActivity from "./recent-activity";

const stats = {
  totalPlants: 500,
  totalArticles: 226,
  publishedArticles: 180,
  totalViews: 156000,
};
export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Plants</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalPlants}
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
                {stats.totalArticles}
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
                {stats.publishedArticles}
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
                {stats.totalViews.toLocaleString()}
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
