"use client";
import { Edit3, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { deletePlant } from "../../actions";
import { useState } from "react";
import EditPlantForm from "./edit-plant-form";
import { Plant } from "@/features/plant-guides/schema";

type Props = {
  id: number;
  slug: string;
  plant: Plant;
};

export default function AdminPlantsButtons({ id, slug, plant }: Props) {
  const [editOpen, setEditFormOpen] = useState(false);
  function handleDeletePlant(id: number) {
    deletePlant(id);
  }
  function onclick() {
    setEditFormOpen(!editOpen);
  }
  return (
    <div className="flex space-x-2">
      <button onClick={onclick} className="text-gray-600 hover:text-gray-900">
        <Edit3 className="w-4 h-4" />
      </button>
      <Link
        href={`/plant-guides/${slug}`}
        className="text-gray-600 hover:text-gray-900"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={() => handleDeletePlant(id)}
        className="text-gray-600 hover:text-gray-900"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {editOpen && (
        <EditPlantForm plant={plant} setEditFormOpen={setEditFormOpen} />
      )}
    </div>
  );
}
