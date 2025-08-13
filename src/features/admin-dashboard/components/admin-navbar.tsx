"use client";
import { BarChart3, BookOpen, Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <div className="mb-8">
      <nav className="flex space-x-8">
        <Link
          href={"/admin-dashboard/overview"}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive("/admin-dashboard/overview") ||
            isActive("/admin-dashboard")
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <span>Overview</span>
          <BarChart3 className="w-5 h-5" />
        </Link>
        <Link
          href={"/admin-dashboard/plants"}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive("/admin-dashboard/plants")
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <span>Plants</span>
          <Leaf className="w-5 h-5" />
        </Link>
        <Link
          href={"/admin-dashboard/articles"}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive("/admin-dashboard/articles")
              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
              : "bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <span>Articles</span>
          <BookOpen className="w-5 h-5" />
        </Link>
      </nav>
    </div>
  );
}
