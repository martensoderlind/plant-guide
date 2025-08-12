"use client";
import { useState } from "react";
import PlantContainer from "./plant-container";
import SearchBar from "./searchBar";
import { Plant } from "../schema";

type Props = {
  plantGuides: Plant[];
};

export default function PlantGuides({ plantGuides }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPlantGuides = plantGuides.filter(
    (plantGuide) =>
      searchTerm === "" ||
      plantGuide.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("searchterm:", filteredPlantGuides);
  return (
    <div>
      <p>plants</p>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PlantContainer plantGuides={filteredPlantGuides} />
    </div>
  );
}
