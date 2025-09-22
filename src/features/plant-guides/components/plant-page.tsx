import { PlantCategory } from "../types";
import PlantPageHeader from "./plant-page-header";
import PlantPageCareInformation from "./plant-page-care-information";
import PlantPageMainContent from "./plant-page-main-content";
import { plantGuidesService } from "../instance";
import Link from "next/link";
import { Undo2 } from "lucide-react";

type Props = {
  slug: string;
};

export default async function PlantPage({ slug }: Props) {
  const plant = await plantGuidesService.getPlantGuide(slug);

  if (!plant) {
    return (
      <div className="max-w-4xl mx-auto py-8 flex flex-col justify-items-center">
        <h1 className="text-xl md:text-2xl font-bold text-gray-200 mb-4 leading-tight mx-auto">
          No plant with that name exist.
        </h1>
        <Link href={"/"} className="mx-auto flex flex-row">
          <span className="text-xl md:text-xl font-bold text-gray-200 mb-4 leading-tight mr-2">
            Return to home page
          </span>
          <Undo2 />
        </Link>
      </div>
    );
  }
  const formatCareLevel = (level: "easy" | "medium" | "hard") => {
    const levels = {
      easy: { text: "Easy", color: "bg-green-100 text-green-800", icon: "🌱" },
      medium: {
        text: "Medium",
        color: "bg-yellow-100 text-yellow-800",
        icon: "🌿",
      },
      hard: { text: "Hard", color: "bg-red-100 text-red-800", icon: "🌳" },
    };
    return levels[level] || levels.easy;
  };

  const formatLightRequirement = (
    light: "low" | "medium" | "bright" | "direct"
  ) => {
    const lights = {
      low: { text: "Low Light", intensity: "25%" },
      medium: { text: "Medium Light", intensity: "50%" },
      bright: { text: "Bright Light", intensity: "75%" },
      direct: { text: "Direct Sun", intensity: "100%" },
    };
    return lights[light] || lights.medium;
  };

  const formatHumidity = (humidity: "easy" | "medium" | "hard") => {
    const humidities = {
      easy: { text: "Low Humidity", level: "Easy-going" },
      medium: { text: "Medium Humidity", level: "Moderate" },
      hard: { text: "High Humidity", level: "Demanding" },
    };
    return humidities[humidity] || humidities.easy;
  };

  const formatCategory = (category: PlantCategory) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const careLevel = formatCareLevel(plant.care_level);
  const lightReq = formatLightRequirement(plant.light_requirement);
  const humidity = formatHumidity(plant.humidity_preference);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <PlantPageHeader
        imageUrl={plant.image_url}
        name={plant.name}
        careLevel={careLevel}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {plant.name}
          </h1>
          <p className="text-lg text-gray-600 italic">
            {plant.scientific_name}
          </p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {formatCategory(plant.plant_category)}
            </span>
          </div>
        </div>

        {plant.description && (
          <PlantPageMainContent description={plant.description} />
        )}

        <PlantPageCareInformation
          water_frequency_days={plant.water_frequency_days}
          lightReq={lightReq}
          careLevel={careLevel}
          temperature_min={plant.temperature_min}
          temperature_max={plant.temperature_max}
          humidity={humidity}
          updatedAt={plant.updated_at}
        />
      </div>
    </div>
  );
}
