"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";

export default function AdminPlantForm() {
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientific_name: "",
    description: "",
    water_frequency_days: 7,
    temperature_min: 18,
    temperature_max: 25,
    image_url: "",
    care_level: "easy",
    light_requirement: "medium",
    humidity_preference: "medium",
    plant_category: "indoor plant",
  });
  const careLevels = ["easy", "medium", "hard"];
  const lightRequirements = ["low", "medium", "bright", "direct"];
  const humidityPreferences = ["low", "medium", "high"];
  const plantCategories = [
    "indoor plant",
    "outdoor plant",
    "succulent",
    "herb",
    "flowering",
  ];
  const handleAddPlant = () => {
    const plant = {
      ...newPlant,
      id: Date.now(),
      updated_at: new Date(),
      created_at: new Date(),
    };

    setNewPlant({
      name: "",
      scientific_name: "",
      description: "",
      water_frequency_days: 7,
      temperature_min: 18,
      temperature_max: 25,
      image_url: "",
      care_level: "easy",
      light_requirement: "medium",
      humidity_preference: "medium",
      plant_category: "indoor plant",
    });
    setIsAddingPlant(false);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-200">Plant Management</h2>
        <button
          onClick={() => setIsAddingPlant(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Plant</span>
        </button>
      </div>

      {isAddingPlant && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Plant
            </h3>
            <button
              onClick={() => setIsAddingPlant(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.name}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scientific Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.scientific_name}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    scientific_name: e.target.value,
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.description}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Watering Frequency (days)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.water_frequency_days}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    water_frequency_days: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Care Level
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.care_level}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, care_level: e.target.value })
                }
              >
                {careLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Light Requirement
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.light_requirement}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    light_requirement: e.target.value,
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.humidity_preference}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    humidity_preference: e.target.value,
                  })
                }
              >
                {humidityPreferences.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Temperature (°C)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.temperature_min}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    temperature_min: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Temperature (°C)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.temperature_max}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    temperature_max: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsAddingPlant(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPlant}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Plant</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
