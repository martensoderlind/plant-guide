import { plantGuidesService } from "../instance";
import PlantGuidesContainer from "./plant-guides-container";

type Props = {
  currentPage: number;
};

export default async function PlantGuides({ currentPage }: Props) {
  const plantGuides = await plantGuidesService.getAllPlantGuides(currentPage);
  const plantCount = await plantGuidesService.totalPlantGuideCount();
  return (
    <div>
      <PlantGuidesContainer plantGuides={plantGuides} plantCount={plantCount} />
    </div>
  );
}
