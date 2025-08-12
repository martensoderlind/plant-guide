"use client";
import { BookOpen, Droplets, Leaf, Search, Star, Sun } from "lucide-react";
import { useState } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    {
      value: "Indoor plants",
      label: "Indoor Plants",
    },
    {
      value: "outdoor plants",
      label: "Outdoor Plants",
    },
    {
      value: "succulents",
      label: "Succulents",
    },
    {
      value: "flowering",
      label: "Flowering Plants",
    },
  ];

  const handleCategoryToggle = (categoryValue: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((cat) => cat !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const removeCategoryFilter = (categoryValue: string) => {
    setSelectedCategories((prev) =>
      prev.filter((cat) => cat !== categoryValue)
    );
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for plants"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="lg:w-64 relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-left bg-white"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  {selectedCategories.length === 0
                    ? "Select categories"
                    : selectedCategories.length === 1
                    ? `${selectedCategories.length} Category selected`
                    : `${selectedCategories.length} Categories selected`}
                </span>
                <span className="text-gray-400">▼</span>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="p-2">
                  {categories.map((category) => (
                    <label
                      key={category.value}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.value)}
                        onChange={() => handleCategoryToggle(category.value)}
                        className="mr-3 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <div className="border-t border-gray-200 p-2">
                    <button
                      onClick={clearAllCategories}
                      className="w-full px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {(searchTerm || selectedCategories.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2 text-emerald-600 hover:text-emerald-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategories.map((categoryValue) => {
              const category = categories.find(
                (c) => c.value === categoryValue
              );
              return (
                <span
                  key={categoryValue}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm"
                >
                  {category?.label}
                  <button
                    onClick={() => removeCategoryFilter(categoryValue)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
