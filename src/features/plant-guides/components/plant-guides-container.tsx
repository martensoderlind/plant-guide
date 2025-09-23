"use client";
import { useState } from "react";
import PlantContainer from "./plant-container";
import SearchBar from "./searchBar";
import { Plant } from "../schema";

type Props = {
  plantGuides: Plant[];
};

export default function PlantGuidesContainer({ plantGuides }: Props) {
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
      <p className="font-bold text-3xl">Plants</p>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <PlantContainer plantGuides={filteredPlantGuides} />
    </div>
  );
}
