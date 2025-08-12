import { plantGuidesService } from "../instance";
import PlantGuidesContainer from "./plant-guides-container";

export default async function PlantGuides() {
  const plantGuides = await plantGuidesService.getAllPlantGuides();

  return (
    <div>
      <PlantGuidesContainer plantGuides={plantGuides} />
    </div>
  );
}
