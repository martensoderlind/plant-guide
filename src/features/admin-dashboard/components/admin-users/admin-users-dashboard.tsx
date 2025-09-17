import AdminUserContainer from "./admin-user-container";
import AdminUserForm from "./admin-user-form";
import { adminDashboardService } from "../../instance";

export default async function AdminUserDashboard() {
  const roles = await adminDashboardService.getUserRoles();
  return (
    <div className="space-y-6">
      <AdminUserForm roles={roles} />
      <AdminUserContainer />
    </div>
  );
}
