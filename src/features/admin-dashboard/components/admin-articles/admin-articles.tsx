"use client";
import { Edit3, Eye, Plus, Save, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const articleCategories = [
  "basics",
  "watering",
  "lighting",
  "diseases",
  "propagation",
  "seasonal",
  "air-purifying",
];
const difficultyLevels = ["beginner", "intermediate", "advanced"];
const articleStatuses = ["draft", "published", "archived"];
export default function AdminArticles() {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "basics",
    difficulty_level: "beginner",
    status: "draft",
    is_featured: false,
    featured_image_url: "",
    meta_title: "",
    meta_description: "",
  });
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Plant Care Basics for Beginners",
      slug: "plant-care-basics-beginners",
      excerpt:
        "Learn the essential principles to succeed with your first houseplants.",
      content: "Full article content here...",
      category: "basics",
      difficulty_level: "beginner",
      status: "published",
      is_featured: true,
      reading_time_minutes: 8,
      views: 2847,
      likes: 124,
      published_at: new Date("2024-08-10"),
      created_at: new Date("2024-08-09"),
    },
    {
      id: 2,
      title: "Watering Techniques: When and How Much?",
      slug: "watering-techniques-when-how-much",
      excerpt: "Discover the secrets behind proper watering.",
      content: "Full article content here...",
      category: "watering",
      difficulty_level: "beginner",
      status: "draft",
      is_featured: false,
      reading_time_minutes: 6,
      views: 0,
      likes: 0,
      published_at: null,
      created_at: new Date("2024-08-08"),
    },
  ]);
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };
  const handleAddArticle = () => {
    const article = {
      ...newArticle,
      id: Date.now(),
      views: 0,
      likes: 0,
      reading_time_minutes: Math.ceil(
        newArticle.content.split(" ").length / 200
      ),
      published_at: newArticle.status === "published" ? new Date() : null,
      created_at: new Date(),
    };
    setArticles([article, ...articles]);
    setNewArticle({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "basics",
      difficulty_level: "beginner",
      status: "draft",
      is_featured: false,
      featured_image_url: "",
      meta_title: "",
      meta_description: "",
    });

    setIsAddingArticle(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Article Management</h2>
        <button
          onClick={() => setIsAddingArticle(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>
      {isAddingArticle && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Article
            </h3>
            <button
              onClick={() => setIsAddingArticle(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setNewArticle({
                    ...newArticle,
                    title,
                    slug: generateSlug(title),
                  });
                }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                value={newArticle.slug}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, slug: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.excerpt}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    excerpt: e.target.value,
                  })
                }
                placeholder="Brief description of the article..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    content: e.target.value,
                  })
                }
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.category}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    category: e.target.value,
                  })
                }
              >
                {articleCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.difficulty_level}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    difficulty_level: e.target.value,
                  })
                }
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.status}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, status: e.target.value })
                }
              >
                {articleStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.featured_image_url}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    featured_image_url: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={newArticle.is_featured}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        is_featured: e.target.checked,
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Featured Article
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.meta_title}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    meta_title: e.target.value,
                  })
                }
                placeholder="SEO title (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.meta_description}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    meta_description: e.target.value,
                  })
                }
                placeholder="SEO description (optional)"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsAddingArticle(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddArticle}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Article</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            All Articles ({articles.length})
          </h3>
        </div>

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
              {articles.map((article) => (
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
                        <div className="text-sm text-gray-500">
                          {article.excerpt}
                        </div>
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
                    {article.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.created_at instanceof Date
                      ? article.created_at.toDateString()
                      : new Date(article.created_at).toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-900">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/articles/`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
