import { Plus, Save, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Article,
  articleCategoryEnum,
  articleStatusEnum,
  difficultyLevelEnum,
} from "@/features/articles/schema";
import TiptapEditor from "./tiptap-editor";
import { getAllTags, getArticleTags } from "../../actions";

type ArticleCategory = (typeof articleCategoryEnum.enumValues)[number];
type DifficultyLevel = (typeof difficultyLevelEnum.enumValues)[number];
type ArticleStatus = (typeof articleStatusEnum.enumValues)[number];

type Props = {
  article: Article;
  setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ArticleFormData {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  reading_time_minutes: number | null;
  category: ArticleCategory;
  difficulty_level: DifficultyLevel;
  status: ArticleStatus;
  is_featured: boolean;
  featured_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
  currentTag: string;
}
export default function EditArticleForm({ article, setEditFormOpen }: Props) {
  const [availableTags, setAvailableTags] = useState<
    Array<{
      id: string;
      name: string;
      slug: string;
      color: string | null;
      created_at: Date;
    }>
  >([]);

  const [articleInformation, setArticleInformation] = useState<ArticleFormData>(
    {
      ...article,
      tags: [],
      currentTag: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadTags = async () => {
      try {
        const articleTags = await getArticleTags(article.id);
        setArticleInformation({
          ...article,
          tags: articleTags ? articleTags.map((t) => t.name) : [],
          currentTag: "",
        });
        const tags = await getAllTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    };
    loadTags();
  }, []);

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const { tags, ...articleData } = articleInformation;
    const article: ArticleFormData = {
      ...articleData,
      tags: tags,
      excerpt: articleData.excerpt ? articleData.excerpt.trim() : null,
      featured_image_url: articleData.featured_image_url
        ? articleData.featured_image_url.trim()
        : null,
      meta_title: articleData.meta_title ? articleData.meta_title.trim() : null,
      meta_description: articleData.meta_description
        ? articleData.meta_description.trim()
        : null,
    };
    console.log("Submitting article:", article);
    // const result = await updateArticle(article);

    // if (result.success) {
    //   setEditFormOpen(false);
    // } else {
    //   setErrors(result.error);
    // }
  }

  const addTag = () => {
    const tagName = articleInformation.currentTag.trim();
    if (tagName && !articleInformation.tags.includes(tagName)) {
      setArticleInformation({
        ...articleInformation,
        tags: [...articleInformation.tags, tagName],
        currentTag: "",
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setArticleInformation({
      ...articleInformation,
      tags: articleInformation.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const articleCategories = articleCategoryEnum.enumValues;
  const difficultyLevels = difficultyLevelEnum.enumValues;
  const articleStatuses = articleStatusEnum.enumValues;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-left">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6/10 p-6 mt-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Article</h2>
          <button
            onClick={() => setEditFormOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="close"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={articleInformation.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setArticleInformation({
                    ...articleInformation,
                    title,
                    slug: generateSlug(title),
                  });
                }}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                value={articleInformation.slug}
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    slug: e.target.value,
                  })
                }
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                rows={2}
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={
                  articleInformation.excerpt ? articleInformation.excerpt : ""
                }
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    excerpt: e.target.value,
                  })
                }
                placeholder="Brief description of the article..."
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <TiptapEditor
                value={articleInformation.content}
                onChange={(val) =>
                  setArticleInformation({
                    ...articleInformation,
                    content: val,
                  })
                }
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated reading time
              </label>
              <input
                type="number"
                min={0}
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={
                  articleInformation.reading_time_minutes
                    ? articleInformation.reading_time_minutes
                    : ""
                }
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    reading_time_minutes: parseInt(e.target.value),
                  })
                }
              />
              {errors.reading_time_minutes && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.reading_time_minutes}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={articleInformation.category}
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
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
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={articleInformation.difficulty_level}
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
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
              {errors.difficulty_level && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.difficulty_level}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={articleInformation.status}
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    status: e.target.value as ArticleStatus,
                  })
                }
              >
                {articleStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={
                  articleInformation.featured_image_url
                    ? articleInformation.featured_image_url
                    : ""
                }
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    featured_image_url: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
              {errors.featured_img_url && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-y-3">
                {/* Current tags display */}
                {articleInformation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {articleInformation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 border border-emerald-200"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-emerald-600 hover:text-emerald-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Add new tag input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="text-gray-500 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={articleInformation.currentTag}
                    onChange={(e) =>
                      setArticleInformation({
                        ...articleInformation,
                        currentTag: e.target.value,
                      })
                    }
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add a tag (press Enter or click +)"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={!articleInformation.currentTag.trim()}
                    className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {availableTags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Existing tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {availableTags
                        .filter(
                          (tag) => !articleInformation.tags.includes(tag.name)
                        )
                        .slice(0, 10)
                        .map((tag) => (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => {
                              if (!articleInformation.tags.includes(tag.name)) {
                                setArticleInformation({
                                  ...articleInformation,
                                  tags: [...articleInformation.tags, tag.name],
                                });
                              }
                            }}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            {tag.name}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.tags && (
                <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={articleInformation.is_featured}
                    onChange={(e) =>
                      setArticleInformation({
                        ...articleInformation,
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
                value={
                  articleInformation.meta_title
                    ? articleInformation.meta_title
                    : ""
                }
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    meta_title: e.target.value,
                  })
                }
                placeholder="SEO title (optional)"
              />
              {errors.meta_title && (
                <p className="mt-1 text-sm text-red-600">{errors.meta_title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <input
                type="text"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={
                  articleInformation.meta_description
                    ? articleInformation.meta_description
                    : ""
                }
                onChange={(e) =>
                  setArticleInformation({
                    ...articleInformation,
                    meta_description: e.target.value,
                  })
                }
                placeholder="SEO description (optional)"
              />
              {errors.meta_description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.meta_description}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditFormOpen(false)}
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
      </div>
    </div>
  );
}
