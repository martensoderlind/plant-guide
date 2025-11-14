"use client";

import { Plus, Save, X } from "lucide-react";
import { useState } from "react";

import {
  careLevelEnum,
  lightRequirementEnum,
  humidityPreferenceEnum,
  plantCategoryEnum,
} from "../../../plant-guides/schema";
import { useToast } from "../../../../../hooks/toast";
import ToastContainer from "@/components/ToastContainer";
import { NewPlant } from "../../types";
import addPlant from "../../actions";
import TiptapEditor from "../admin-articles/tiptap-editor";
type CareLevel = (typeof careLevelEnum.enumValues)[number];
type LightRequirement = (typeof lightRequirementEnum.enumValues)[number];
type HumidityPreference = (typeof humidityPreferenceEnum.enumValues)[number];
type PlantCategory = (typeof plantCategoryEnum.enumValues)[number];

export default function AdminPlantForm() {
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [newPlant, setNewPlant] = useState<
    Omit<NewPlant, "image_url"> & {
      image_url: string;
    }
  >({
    name: "",
    slug: "",
    scientific_name: "",
    content: null,
    water_frequency_days: 7,
    temperature_min: 18,
    temperature_max: 25,
    image_url: "",
    is_featured: false,
    care_level: "easy",
    light_requirement: "medium",
    humidity_preference: "medium",
    plant_category: "indoor plant",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toasts, removeToast, success, info } = useToast();

  const careLevels = careLevelEnum.enumValues;
  const lightRequirements = lightRequirementEnum.enumValues;
  const humidityPreferences = humidityPreferenceEnum.enumValues;
  const plantCategories = plantCategoryEnum.enumValues;

  const handleAddPlant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const plant = {
      ...newPlant,
      slug: generateSlug(newPlant.name),
      image_url: newPlant.image_url.trim() || null,
    };

    const result = await addPlant(plant);

    if (result.success) {
      setNewPlant({
        name: "",
        slug: "",
        scientific_name: "",
        content: null,
        water_frequency_days: 7,
        temperature_min: 18,
        temperature_max: 25,
        image_url: "",
        is_featured: false,
        care_level: "easy" as const,
        light_requirement: "medium" as const,
        humidity_preference: "medium" as const,
        plant_category: "indoor plant" as const,
      });
      success("Success!", result.message);
      setIsAddingPlant(false);
    } else {
      info(result.message, "follow the instructions in the form.");
      setErrors(result.error);
    }
  };

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-200">Plant Management</h2>
          {}
        </div>
        <button
          onClick={() => setIsAddingPlant(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Plant</span>
        </button>
      </div>

      {isAddingPlant && (
        <form
          onSubmit={handleAddPlant}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Plant
            </h3>
            <button
              type="button"
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
                className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.name}
                onChange={(e) =>
                  setNewPlant({ ...newPlant, name: e.target.value })
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
                value={newPlant.scientific_name}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.content}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
                    content: e.target.value,
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
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={newPlant.water_frequency_days}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.care_level}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.light_requirement}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.humidity_preference}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.temperature_min}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.temperature_max}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.plant_category}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                value={newPlant.image_url}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
                checked={newPlant.is_featured ? newPlant.is_featured : false}
                onChange={(e) =>
                  setNewPlant({
                    ...newPlant,
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
              onClick={() => setIsAddingPlant(false)}
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
      )}
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        position="bottom-right"
      />
    </>
  );
}
