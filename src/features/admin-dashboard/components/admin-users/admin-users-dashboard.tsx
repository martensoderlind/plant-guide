import AdminUserContainer from "./admin-user-container";
import AdminUserForm from "./admin-user-form";
import { adminDashboardService } from "../../instance";
import { Suspense } from "react";
import AdminDashboardFallback from "../admin-dashboard-fallback";

type Props = {
  currentPage: number;
};

export default async function AdminUserDashboard({ currentPage }: Props) {
  const roles = await adminDashboardService.getUserRoles();
  return (
    <div className="space-y-6">
      <AdminUserForm roles={roles} />
      <Suspense
        fallback={
          <AdminDashboardFallback
            header={"All users"}
            tableHeaders={["USER", "ROLE", "JOINED", "ACTIONS"]}
            emailPlaceHolder={true}
          />
        }
      >
        <AdminUserContainer currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
