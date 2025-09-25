import { User } from "@/features/iam/types";
import AdminUserButtons from "./admin-user-buttons";
import Image from "next/image";
import AdminUserRowSection from "./admin-user-row-section";

type Props = {
  user: User;
};

export default async function AdminUserRow({ user }: Props) {
  return (
    <tr key={user.id} className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <AdminUserRowSection
          username={user.username}
          fullname={user.fullName}
          email={user.email}
          avatarUrl={user.avatarUrl}
        />
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
        <AdminUserButtons id={user.id} />
      </td>
    </tr>
  );
}
