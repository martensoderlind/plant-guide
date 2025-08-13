import { Edit3, Trash2 } from "lucide-react";
import { getAllPlantGuides } from "../actions";
import AdminPlantsButtons from "./admin-plants-buttons";

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
            <tr key={plant.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {plant.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plant.scientific_name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    plant.care_level === "easy"
                      ? "bg-green-100 text-green-800"
                      : plant.care_level === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {plant.care_level}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {plant.light_requirement}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {plant.water_frequency_days} days
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <AdminPlantsButtons key={idx} id={plant.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
