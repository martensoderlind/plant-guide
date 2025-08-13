"use client";
import { Edit3, Trash2 } from "lucide-react";

type Props = {
  id: number;
};

export default function AdminPlantsButtons({ id }: Props) {
  const handleDeletePlant = (id: number) => {
    //delete functionality
  };

  return (
    <div className="flex space-x-2">
      <button className="text-emerald-600 hover:text-emerald-900">
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDeletePlant(id)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
