import { Suspense } from "react";
import AdminDashboardPlantContainer from "../admin-dashboard-plant-container";
import AdminPlantForm from "./admin-plants-form";
import AdminDashboardFallback from "../admin-dashboard-fallback";
import { adminDashboardService } from "../../instance";
import Pagination from "../pagination";

type Props = {
  currentPage: number;
};

export default async function AdminPlants({ currentPage }: Props) {
  const totalPlants = await adminDashboardService.getPlantGuideCount();
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };
  return (
    <div className="space-y-6">
      <AdminPlantForm />
      <Suspense
        fallback={
          <AdminDashboardFallback
            tableHeaders={[
              "PLANT",
              "CARE LEVEL",
              "LIGHT",
              "WATER FREQUENCY",
              "ACTIONS",
            ]}
            emailPlaceHolder={false}
          />
        }
      >
        <AdminDashboardPlantContainer currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages(totalPlants)} />
    </div>
  );
}
