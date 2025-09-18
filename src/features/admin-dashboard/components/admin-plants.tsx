import { Suspense } from "react";
import AdminDashboardPlantContainer from "./admin-dashboard-plant-container";
import AdminPlantForm from "./admin-plants-form";
import AdminDashboardFallback from "./admin-dashboard-fallback";

export default function AdminPlants() {
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
        <AdminDashboardPlantContainer />
      </Suspense>
    </div>
  );
}
