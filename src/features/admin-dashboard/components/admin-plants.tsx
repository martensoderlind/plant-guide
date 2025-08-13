import AdminDashboardPlantContainer from "./admin-dashboard-plant-container";
import AdminPlantForm from "./admin-plants-form";

export default function AdminPlants() {
  return (
    <div className="space-y-6">
      <AdminPlantForm />
      <AdminDashboardPlantContainer />
    </div>
  );
}
