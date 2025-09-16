import AdminUserContainer from "./admin-user-container";
import AdminUserForm from "./admin-user-form";

export default function AdminUserDashboard() {
  return (
    <div className="space-y-6">
      <AdminUserForm />
      <AdminUserContainer />
    </div>
  );
}
