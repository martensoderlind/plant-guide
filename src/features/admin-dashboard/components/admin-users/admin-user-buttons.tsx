"use client";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { deleteUser } from "../../actions";

type Props = {
  id: string;
};

export default function AdminUserButtons({ id }: Props) {
  function handleDeleteUser(id: string) {
    deleteUser(id);
  }
  return (
    <div className="flex space-x-2">
      <button className="text-emerald-600 hover:text-emerald-900">
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDeleteUser(id)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
