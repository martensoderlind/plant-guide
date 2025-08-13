import { Edit3, Trash2 } from "lucide-react";
import { getAllPlantGuides } from "../actions";
import AdminPlantsButtons from "./admin-plants-buttons";
import PlantTableRow from "./plant-table-row";

export default async function AdminDashboardPlantContainer() {
  const plants = await getAllPlantGuides();

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Plant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Care Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Light
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Water Frequency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plants.map((plant, idx) => (
            <PlantTableRow key={idx} plant={plant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
