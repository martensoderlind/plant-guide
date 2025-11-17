import PlantPageHeader from "./plant-page-header";
import PlantPageCareInformation from "./plant-page-care-information";
import { plantGuidesService } from "../instance";
import { RenderContent } from "@/components/render-content";
import PlantPageFallback from "./plant-page-fallback";

type Props = {
  slug: string;
};

export default async function PlantPage({ slug }: Props) {
  const plant = await plantGuidesService.getPlantGuide(slug);

  if (!plant) {
    return <PlantPageFallback />;
  }
  const { careLevel, lightRequirement, humidityPreference, category } = plant;
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
              {category}
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
          lightReq={lightRequirement}
          careLevel={careLevel}
          temperature_min={plant.temperature_min}
          temperature_max={plant.temperature_max}
          humidity={humidityPreference}
          updatedAt={plant.updated_at}
        />
      </div>
    </>
  );
}
