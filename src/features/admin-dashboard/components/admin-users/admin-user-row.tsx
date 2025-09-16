import { User } from "@/features/iam/types";
import { log } from "console";

type Props = {
  user: User;
};

export default function AdminUserRow({ user }: Props) {
  return (
    <tr key={user.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center">
          {user.avatarUrl ? (
            <img
              className="h-10 w-10 rounded-full mr-4"
              src={user.avatarUrl}
              alt={`${user.fullName || user.username}'s avatar`}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-gray-700">
                {(user.fullName || user.username).charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">
                {user.fullName || user.username}
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {user.email}
              </span>
            </div>
            <div className="text-sm text-gray-500">@{user.username}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {user.role ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user.role}
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            No role
          </span>
        )}
      </td>
      {user.created_at ? (
        <td className="px-6 py-4 text-sm text-gray-500">
          {user.created_at.toDateString()}
        </td>
      ) : (
        <td className="px-6 py-4 text-sm text-gray-500">-</td>
      )}
      <td className="px-6 py-4 text-right text-sm font-medium">
        <div className="flex justify-center space-x-2">
          <button className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors">
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}
