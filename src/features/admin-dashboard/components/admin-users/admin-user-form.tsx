"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import {
  difficultyLevelEnum,
  articleStatusEnum,
} from "../../../articles/schema";
import { NewUser } from "@/features/iam/types";
import { addUser } from "../../actions";

const roleCategories = ["Admin", "User", "Moderator", "Author"];
type DifficultyLevel = (typeof difficultyLevelEnum.enumValues)[number];
type ArticleStatus = (typeof articleStatusEnum.enumValues)[number];

export default function AdminArticleForm() {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    username: "",
    fullName: "",
    avatarUrl: "",
    role: "User",
  });

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user: NewUser = {
        ...newUser,
        avatarUrl: newUser.avatarUrl ? newUser.avatarUrl.trim() : null,
      };

      const result = await addUser(user);

      if (result.success) {
        setNewUser({
          email: "",
          username: "",
          fullName: "",
          avatarUrl: "",
        });
        setIsAddingUser(false);
      } else {
        console.log(
          "Problem while adding the new user. result:",
          result.message
        );
      }
    } catch (error) {
      console.error("Problem while adding the new user:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-200">User Management</h2>
        <button
          onClick={() => setIsAddingUser(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {isAddingUser && (
        <form
          onSubmit={handleAddUser}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New User
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingUser(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.fullName}
                onChange={(e) => {
                  const title = e.target.value;
                  setNewUser({
                    ...newUser,
                    fullName: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.role || "User"}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value,
                  })
                }
                required
              >
                {roleCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Image URL
              </label>
              <input
                type="url"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newUser.avatarUrl || ""}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    avatarUrl: e.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setIsAddingUser(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save User</span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
