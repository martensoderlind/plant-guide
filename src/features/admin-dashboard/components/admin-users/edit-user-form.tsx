import { UpdateUser, User } from "@/features/iam/types";
import { X } from "lucide-react";
import { useState } from "react";
import { updateUser } from "../../actions";

type Props = {
  user: User;
  setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserForm({ user, setEditFormOpen }: Props) {
  const [userInformation, setUserInformation] = useState<UpdateUser>({
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
  });

  function closeForm() {
    setEditFormOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedUser: UpdateUser = {
      ...userInformation,
      id: user.id,
    };

    const result = await updateUser(updatedUser);

    if (result.success) {
      //error handling
      closeForm();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-left">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Edit User</h2>
          <button
            onClick={() => closeForm()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="close"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={userInformation.fullName}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  fullName: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300  focus:border-transparent text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue={userInformation.username}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  username: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={userInformation.email}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  email: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300  focus:border-transparent text-gray-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => closeForm()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-white hover:text-gray-950 hover:border-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
