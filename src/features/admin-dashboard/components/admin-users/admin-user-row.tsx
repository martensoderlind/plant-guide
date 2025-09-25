import { User } from "@/features/iam/types";
import AdminUserButtons from "./admin-user-buttons";
import AdminUserRowSection from "./admin-user-row-section";
import AdminUserRowRole from "./admin-user-row-role";

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
        <AdminUserRowRole role={user.role} />
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
