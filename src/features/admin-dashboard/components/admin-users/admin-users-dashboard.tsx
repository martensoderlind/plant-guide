import AdminUserContainer from "./admin-user-container";
import AdminUserForm from "./admin-user-form";
import { Suspense } from "react";
import AdminDashboardFallback from "../admin-dashboard-fallback";
import Pagination from "@/shared/components/pagination";
import { getUserCount, getUserRoles } from "../../actions";

type Props = {
  currentPage: number;
};

export default async function AdminUserDashboard({ currentPage }: Props) {
  const roles = await getUserRoles();
  const userCount = await getUserCount();

  if (roles.ok === false || userCount.ok === false) {
    return <div>Could not load data</div>;
  }
  console.log("USER COUNT:", userCount.data);
  console.log("ROLES:", roles.data);

  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
  return (
    <div className="space-y-6">
      <AdminUserForm roles={roles.data} />
      <Suspense
        fallback={
          <AdminDashboardFallback
            header={"All users"}
            tableHeaders={["USER", "ROLE", "JOINED", "ACTIONS"]}
            emailPlaceHolder={true}
          />
        }
      >
        <AdminUserContainer
          currentPage={currentPage}
          userCount={userCount.data}
        />
      </Suspense>
      <Pagination totalPages={totalPages(userCount.data)} />
    </div>
  );
}
