import { Save, X } from "lucide-react";
import { useState } from "react";
import {
  careLevelEnum,
  humidityPreferenceEnum,
  lightRequirementEnum,
  Plant,
  plantCategoryEnum,
} from "@/features/plant-guides/schema";
import TiptapEditor from "../admin-articles/tiptap-editor";
import { updatePlant } from "../../actions";

type CareLevel = (typeof careLevelEnum.enumValues)[number];
type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
type HumidityPreference = (typeof humidityPreferenceEnum.enumValues)[number];
type PlantCategory = (typeof plantCategoryEnum.enumValues)[number];
type Props = {
  plant: Plant;
  setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditPlantForm({ plant, setEditFormOpen }: Props) {
  const [plantInformation, setPlantInformation] = useState<Plant>({
    ...plant,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const careLevels = careLevelEnum.enumValues;
  const lightRequirements = lightRequirementEnum.enumValues;
  const humidityPreferences = humidityPreferenceEnum.enumValues;
  const plantCategories = plantCategoryEnum.enumValues;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedPlant: Plant = {
      ...plantInformation,
    };
    const result = await updatePlant(updatedPlant);

    if (result.success) {
      setEditFormOpen(false);
    } else {
      setErrors(result.error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-left">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6/10 p-6 mt-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Edit Plant guide
          </h2>
          <button
            onClick={() => setEditFormOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="close"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.name}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    name: e.target.value,
                  })
                }
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scientific Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.scientific_name}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    scientific_name: e.target.value,
                  })
                }
              />
              {errors.scientific_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.scientific_name}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <TiptapEditor
                value={plantInformation.content ? plantInformation.content : ""}
                onChange={(val) =>
                  setPlantInformation({
                    ...plantInformation,
                    content: val,
                  })
                }
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Watering Frequency (days)
              </label>
              <input
                type="number"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.water_frequency_days}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    water_frequency_days: parseInt(e.target.value),
                  })
                }
              />
              {errors.water_frequency_days && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.water_frequency_days}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Care Level
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.care_level}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    care_level: e.target.value as CareLevel,
                  })
                }
              >
                {careLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.care_level && (
                <p className="mt-1 text-sm text-red-600">{errors.care_level}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Light Requirement
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.light_requirement}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    light_requirement: e.target.value as LightRequirement,
                  })
                }
              >
                {lightRequirements.map((req) => (
                  <option key={req} value={req}>
                    {req}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Humidity Preference
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.humidity_preference}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    humidity_preference: e.target.value as HumidityPreference,
                  })
                }
              >
                {humidityPreferences.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
              {errors.humidity_preference && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.humidity_preference}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Temperature (°C)
              </label>
              <input
                type="number"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.temperature_min}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    temperature_min: parseInt(e.target.value),
                  })
                }
              />
              {errors.temperature_min && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.temperature_min}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Temperature (°C)
              </label>
              <input
                type="number"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.temperature_max}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    temperature_max: parseInt(e.target.value),
                  })
                }
              />
              {errors.temperature_max && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.temperature_max}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Category
              </label>
              <select
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={plantInformation.plant_category}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    plant_category: e.target.value as PlantCategory,
                  })
                }
              >
                {plantCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.plant_category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.plant_category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={
                  plantInformation.image_url ? plantInformation.image_url : ""
                }
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    image_url: e.target.value,
                  })
                }
                placeholder="https://example.com/plant-image.jpg"
              />
              {errors.images_url && (
                <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>
              )}
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                checked={plant.is_featured ? plant.is_featured : false}
                onChange={(e) =>
                  setPlantInformation({
                    ...plantInformation,
                    is_featured: e.target.checked,
                  })
                }
              />
              <span className="ml-2 text-sm text-gray-700">
                Featured Article
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditFormOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Plant</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
