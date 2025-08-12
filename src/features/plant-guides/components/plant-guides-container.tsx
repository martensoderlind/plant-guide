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

  const filteredPlantGuides = plantGuides.filter(
    (plantGuide) =>
      searchTerm === "" ||
      plantGuide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <p>plants</p>
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
