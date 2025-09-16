import { adminDashboardService } from "../../instance";

export default function AdminUserDashboard() {
  const users = adminDashboardService.getAllUsers();
  return <div>users</div>;
}
