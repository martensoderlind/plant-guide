import { BookOpen, Leaf } from "lucide-react";

export default function RecentActivity() {
  // This is a placeholder component for recent activity in the admin dashboard.
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-3 bg-emerald-50 rounded-lg">
          <Leaf className="h-8 w-8 text-emerald-600" />
          <div>
            <p className="font-medium text-gray-900">
              New plant added: Monstera Deliciosa
            </p>
            <p className="text-sm text-gray-600">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">
              Article published: Plant Care Basics
            </p>
            <p className="text-sm text-gray-600">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
