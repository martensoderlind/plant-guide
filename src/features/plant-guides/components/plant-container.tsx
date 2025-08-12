import { plantGuidesService } from "../instance";
import { Plant } from "../schema";
import PlantCard from "./plant-card";

type Props = {
  plantGuides: Plant[];
};

export default function PlantContainer({ plantGuides }: Props) {
  return (
    <section className="relative">
      <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {plantGuides.map((plant, idx) => (
            <PlantCard key={idx} plant={plant} />
          ))}
        </div>
      </div>
    </section>
  );
}
