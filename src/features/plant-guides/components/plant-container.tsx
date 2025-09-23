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
  console.log("page count", totalPages(plantGuides.length));
  console.log("plant count", plantCount);
  return (
    <>
      <section className="relative">
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
