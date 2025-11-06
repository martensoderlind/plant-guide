import Pagination from "@/components/pagination";
import { Plant } from "../schema";
import PlantCard from "./plant-card";

type Props = {
  plantGuides: Plant[];
  plantCount: number;
};

export default function PlantContainer({ plantGuides, plantCount }: Props) {
  const totalPages = (totalPlants: number) => {
    if (totalPlants % 6 === 0) {
      return totalPlants / 6;
    } else {
      return totalPlants / 6 + 1;
    }
  };

  return (
    <>
      <section className="relative px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {plantGuides.map((plant, idx) => (
              <PlantCard key={idx} plant={plant} />
            ))}
          </div>
        </div>
      </section>
      <Pagination totalPages={totalPages(plantCount)} />
    </>
  );
}
