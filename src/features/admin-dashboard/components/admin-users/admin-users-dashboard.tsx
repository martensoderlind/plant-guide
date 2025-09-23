import AdminUserContainer from "./admin-user-container";
import AdminUserForm from "./admin-user-form";
import { adminDashboardService } from "../../instance";
import { Suspense } from "react";
import AdminDashboardFallback from "../admin-dashboard-fallback";
import Pagination from "@/components/pagination";

type Props = {
  currentPage: number;
};

export default async function AdminUserDashboard({ currentPage }: Props) {
  const roles = await adminDashboardService.getUserRoles();
  const userCount = await adminDashboardService.getUserCount();
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
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
        <AdminUserContainer currentPage={currentPage} userCount={userCount} />
      </Suspense>
      <Pagination totalPages={totalPages(userCount)} />
    </div>
  );
}
