import { RenderContent } from "@/shared/components/render-content";
import PlantPageFallback from "../plant-page-fallback";
import { plantGuidesService } from "../../instance";
import PlantPageHeaderR from "./plant-header-r";
import PlantPageCareInformationR from "./plant-page-care-information-r";

type Props = {
  slug: string;
};

export default async function PlantPageR({ slug }: Props) {
  const plant = await plantGuidesService.getPlantGuide(slug);

  if (!plant) {
    return <PlantPageFallback />;
  }
  const { careLevel, lightRequirement, humidityPreference, category } = plant;
  return (
    <>
      <div className="p-6 mx-auto max-w-8xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl mb-4 leading-tight text-center">
            {plant.name}
          </h1>
          <p className=" text-gray-600 italic leading-tight text-center">
            {plant.scientific_name}
          </p>
          <div className="mt-2 align-center flex justify-center">
            <span className="inline-block  text-gray-500 text-sm px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <PlantPageHeaderR
          imageUrl={plant.image_url}
          name={plant.name}
          careLevel={careLevel}
        />
        <div className="flex flex-col md:flex-row lg:flex-row">
          <PlantPageCareInformationR
            water_frequency_days={plant.water_frequency_days}
            lightReq={lightRequirement}
            careLevel={careLevel}
            temperature_min={plant.temperature_min}
            temperature_max={plant.temperature_max}
            humidity={humidityPreference}
            updatedAt={plant.updated_at}
          />
          <article className="max-w-3xl mb-4 mx-auto">
            <section className="text-gray-700 text-lg leading-relaxed">
              <RenderContent content={plant.content} />
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
