import { plantGuidesService } from "../instance";
import PlantCard from "./plant-card";

export default async function PlantContainer() {
  const plantGuides = await plantGuidesService.getAllPlantGuides();
  return (
    <section className="relative">
      <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {plantGuides.map((plant, idx) => (
            <PlantCard key={idx} plant={plant} />
          ))}
        </div>
      </div>
      <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-40"></div>
    </section>
  );
}
