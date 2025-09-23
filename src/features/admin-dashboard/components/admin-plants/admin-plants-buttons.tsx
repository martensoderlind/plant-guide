"use client";
import { Edit3, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { deletePlant } from "../../actions";

type Props = {
  id: number;
};

export default function AdminPlantsButtons({ id }: Props) {
  function handleDeletePlant(id: number) {
    deletePlant(id);
  }
  return (
    <div className="flex space-x-2">
      <button className="text-emerald-600 hover:text-emerald-900">
        <Edit3 className="w-4 h-4" />
      </button>
      <Link
        href={`/plant-guides/${id}`}
        className="text-blue-600 hover:text-blue-900"
      >
        <Eye className="w-4 h-4" />
      </Link>
      <button
        onClick={() => handleDeletePlant(id)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
