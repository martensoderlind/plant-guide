import { Plants } from "../types";
import AdminPlantsButtons from "./admin-plants-buttons";

type Props = {
  plant: Plants;
};
export default function PlantTableRow({ plant }: Props) {
  return (
    <tr key={plant.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{plant.name}</div>
          <div className="text-sm text-gray-500">{plant.scientific_name}</div>
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
        <AdminPlantsButtons id={plant.id} />
      </td>
    </tr>
  );
}
