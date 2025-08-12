import { plantGuidesService } from "../instance";
import PlantContainer from "./plant-container";
import PlantGuides from "./plant-guides";

export default async function Test() {
  const plantGuides = await plantGuidesService.getAllPlantGuides();

  return (
    <div>
      <PlantGuides plantGuides={plantGuides} />
    </div>
  );
}
