"use client";
import { Edit3, Trash2 } from "lucide-react";
import { deleteUser } from "../../actions";
import { useToast } from "../../../../../hooks/toast";
import ToastContainer from "@/shared/components/ToastContainer";
import { useState } from "react";
import EditUserForm from "./edit-user-form";
import { User } from "@/features/user/types";

type Props = {
  user: User;
};

export default function AdminUserButtons({ user }: Props) {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { toasts, removeToast, success, warning } = useToast();

  async function handleDeleteUser(id: string) {
    const result = await deleteUser(id);

    if (!result.ok) {
      warning(
        "Error!",
        "There was an error deleting the user, please try again.",
      );
    } else if (result.data.success) {
      success("Success!", result.data.message);
    } else {
      warning("unsuccessful", result.data.message);
    }
  }

  function handleEditUser() {
    setEditFormOpen(!editFormOpen);
  }

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={() => handleEditUser()}
          className="text-gray-600 hover:text-gray-900"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDeleteUser(user.id)}
          className="text-gray-600 hover:text-gray-900"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {editFormOpen && (
          <EditUserForm user={user} setEditFormOpen={setEditFormOpen} />
        )}
      </div>
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position="top-right"
      />
    </>
  );
}
