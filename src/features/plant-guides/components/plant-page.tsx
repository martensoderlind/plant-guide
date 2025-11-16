import { PlantCategoryEnum } from "../types";
import PlantPageHeader from "./plant-page-header";
import PlantPageCareInformation from "./plant-page-care-information";
import { plantGuidesService } from "../instance";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { RenderContent } from "@/components/render-content";
import PlantGuidePageFallback from "./plant-guide-page-fallback";

type Props = {
  slug: string;
};

export default async function PlantPage({ slug }: Props) {
  const plant = await plantGuidesService.getPlantGuide(slug);

  if (!plant) {
    return <PlantGuidePageFallback />;
  }
  const formatCareLevel = (level: "easy" | "medium" | "hard") => {
    const levels = {
      easy: { text: "Easy", color: "bg-green-100 text-green-800" },
      medium: {
        text: "Medium",
        color: "bg-yellow-100 text-yellow-800",
      },
      hard: { text: "Hard", color: "bg-red-100 text-red-800" },
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

  const formatCategory = (category: PlantCategoryEnum) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const careLevel = formatCareLevel(plant.care_level);
  const lightReq = formatLightRequirement(plant.light_requirement);
  const humidity = formatHumidity(plant.humidity_preference);

  return (
    <>
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
        <article className="mb-4">
          <section className="text-gray-700 text-lg leading-relaxed">
            <RenderContent content={plant.content} />
          </section>
        </article>
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
    </>
  );
}
