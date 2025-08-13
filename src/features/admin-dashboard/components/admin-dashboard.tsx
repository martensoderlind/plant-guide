"use client";
import { useState } from "react";
import AdminOverview from "./admin-overview";
import AdminPlants from "./admin-plants";
import AdminDashboardHeader from "./admin-dashboard-header";
import AdminArticles from "./admin-articles";
import AdminNavbar from "./admin-navbar";
import { Plants } from "../types";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  //mock plants
  const [plants, setPlants] = useState<Plants[]>([
    {
      id: 1,
      name: "Monstera Deliciosa",
      scientific_name: "Monstera deliciosa",
      description: "A popular climbing plant with large, fenestrated leaves.",
      water_frequency_days: 7,
      temperature_min: 18,
      temperature_max: 27,
      image_url: "",
      care_level: "easy",
      light_requirement: "medium",
      humidity_preference: "medium",
      plant_category: "indoor plant",
      updated_at: new Date("2024-08-11"),
      created_at: new Date("2024-08-10"),
    },
    {
      id: 2,
      name: "Snake Plant",
      scientific_name: "Sansevieria trifasciata",
      description: "Very hardy plant, perfect for beginners.",
      water_frequency_days: 14,
      temperature_min: 15,
      temperature_max: 29,
      image_url: "",
      care_level: "easy",
      light_requirement: "low",
      humidity_preference: "low",
      plant_category: "indoor plant",
      updated_at: new Date("2024-08-09"),
      created_at: new Date("2024-08-08"),
    },
  ]);
  //mock article
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

  const stats = {
    totalPlants: plants.length,
    totalArticles: articles.length,
    publishedArticles: articles.filter((a) => a.status === "published").length,
    totalViews: articles.reduce((sum, article) => sum + article.views, 0),
  };

  return (
    <div className="min-h-screen">
      <AdminDashboardHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "overview" && <AdminOverview stats={stats} />}

        {activeTab === "plants" && (
          <AdminPlants
            plants={plants}
            setPlants={setPlants}
            searchTerm={searchTerm}
          />
        )}

        {activeTab === "articles" && (
          <AdminArticles
            articles={articles}
            setArticles={setArticles}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
}
