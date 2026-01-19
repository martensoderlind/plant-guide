"use client";
import { useState } from "react";
import PlantContainer from "./plant-container";
import SearchBar from "./searchBar";
import { Plant } from "../schema";

type Props = {
  plantGuides: Plant[];
  plantCount: number;
};

export default function PlantGuidesContainer({
  plantGuides,
  plantCount,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPlantGuides = plantGuides.filter((plant) => {
    const matchesSearch =
      searchTerm === "" ||
      plant.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(plant.plant_category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-4 text-gray-800 leading-tight text-center">
        Plants
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <PlantContainer
        plantGuides={filteredPlantGuides}
        plantCount={plantCount}
      />
    </div>
  );
}
