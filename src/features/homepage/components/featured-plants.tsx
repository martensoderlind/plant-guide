import { Plant } from "@/features/plant-guides/schema";
import { Droplets, Sun, Thermometer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  plant: Plant;
};

export default function FeaturedPlant({ plant }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
      <div className="relative h-48 w-full bg-gradient-to-br from-green-100 to-emerald-200">
        {plant.image_url ? (
          <Image
            width={500}
            height={500}
            src={plant.image_url}
            alt={plant.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{plant.name}</h2>
        <p className="text-sm italic text-gray-500 mb-3">
          {plant.scientific_name}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Droplets size={16} className="" />
            <span>{plant.water_frequency_days}d</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun size={16} className="" />
            <span>{plant.light_requirement}</span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer size={16} className="" />
            <span>
              {plant.temperature_min}°– {plant.temperature_max}°
            </span>
          </div>
        </div>

        <span className="text-xs font-medium uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 self-start">
          {plant.care_level}
        </span>

        <div className="flex-1"></div>
        <Link
          href={"/plant-guides/" + plant.slug}
          className="mt-4 text-gray-700 hover:underline text-sm font-medium self-start"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
