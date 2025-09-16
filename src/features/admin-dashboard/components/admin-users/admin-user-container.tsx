import { adminDashboardService } from "../../instance";

export default function AdminUserContainer() {
  const users = adminDashboardService.getAllUsers();

  return <div></div>;
}
