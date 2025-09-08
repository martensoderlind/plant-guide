"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { addArticle } from "../../actions";
import { NewArticle } from "../../types";
import {
  articleCategoryEnum,
  difficultyLevelEnum,
  articleStatusEnum,
} from "../../../articles/schema";

type ArticleCategory = (typeof articleCategoryEnum.enumValues)[number];
type DifficultyLevel = (typeof difficultyLevelEnum.enumValues)[number];
type ArticleStatus = (typeof articleStatusEnum.enumValues)[number];

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  difficulty_level: DifficultyLevel;
  status: ArticleStatus;
  is_featured: boolean;
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
}

export default function AdminArticleForm() {
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState<ArticleFormData>({
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

  const articleCategories = articleCategoryEnum.enumValues;
  const difficultyLevels = difficultyLevelEnum.enumValues;
  const articleStatuses = articleStatusEnum.enumValues;

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleAddArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const article: NewArticle = {
        ...newArticle,
        excerpt: newArticle.excerpt.trim() || null,
        featured_image_url: newArticle.featured_image_url.trim() || null,
        meta_title: newArticle.meta_title.trim() || null,
        meta_description: newArticle.meta_description.trim() || null,
      };

      const result = await addArticle(article);

      if (result.success) {
        setNewArticle({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "basics" as const,
          difficulty_level: "beginner" as const,
          status: "draft" as const,
          is_featured: false,
          featured_image_url: "",
          meta_title: "",
          meta_description: "",
        });
        setIsAddingArticle(false);
      } else {
        console.log(
          "Problem while adding the new article. result:",
          result.message
        );
      }
    } catch (error) {
      console.error("Problem while adding the new article:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-200">Article Management</h2>
        <button
          onClick={() => setIsAddingArticle(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>

      {isAddingArticle && (
        <form
          onSubmit={handleAddArticle}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Article
            </h3>
            <button
              type="button"
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
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setNewArticle({
                    ...newArticle,
                    title,
                    slug: generateSlug(title),
                  });
                }}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    content: e.target.value,
                  })
                }
                placeholder="Write your article content here..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.category}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    category: e.target.value as ArticleCategory,
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.difficulty_level}
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    difficulty_level: e.target.value as DifficultyLevel,
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newArticle.status}
                onChange={(e) =>
                  setNewArticle({ 
                    ...newArticle, 
                    status: e.target.value as ArticleStatus 
                  })
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              type="button"
              onClick={() => setIsAddingArticle(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Article</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
