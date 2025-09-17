"use client";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { deleteUser } from "../../actions";
import { useState } from "react";
import { useToast } from "../../../../../hooks/toast";
import ToastContainer from "@/components/ToastContainer";

type Props = {
  id: string;
};

export default function AdminUserButtons({ id }: Props) {
  const { toasts, removeToast, success, warning } = useToast();
  async function handleDeleteUser(id: string) {
    const result = await deleteUser(id);
    if (result.success) {
      success("Success!", result.message);
    } else {
      warning("unsuccessful", result.message);
    }
  }
  return (
    <>
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
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position="top-right"
      />
    </>
  );
}
