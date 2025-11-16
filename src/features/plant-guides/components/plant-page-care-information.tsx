import {
  Calendar,
  Droplets,
  Heart,
  Leaf,
  Sun,
  Thermometer,
} from "lucide-react";
import { CareLevel, Humidity, LightReq } from "../types";
import CareInformationContainer from "./care-information-container";

type Props = {
  water_frequency_days: number;
  lightReq: LightReq;
  temperature_min: number;
  temperature_max: number;
  humidity: Humidity;
  careLevel: CareLevel;
  updatedAt: Date | null;
};

export default function PlantPageCareInformation({
  water_frequency_days,
  lightReq,
  temperature_min,
  temperature_max,
  humidity,
  careLevel,
  updatedAt,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <CareInformationContainer
        color="blue"
        icon={<Droplets />}
        description="Watering"
      >
        <p className="text-blue-800">
          Every <span className="font-bold">{water_frequency_days}</span> days
        </p>
      </CareInformationContainer>

      <CareInformationContainer
        color="yellow"
        icon={<Sun />}
        description="Light"
      >
        <p className="text-yellow-800 font-medium">{lightReq.text}</p>
        <div className="mt-2 bg-yellow-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: lightReq.intensity }}
          ></div>
        </div>
      </CareInformationContainer>

      <CareInformationContainer
        color="red"
        icon={<Thermometer />}
        description="Temperature"
      >
        <p className="text-red-800">
          <span className="font-bold">{temperature_min}°C</span> -
          <span className="font-bold"> {temperature_max}°C</span>
        </p>
      </CareInformationContainer>

      <CareInformationContainer
        color="green"
        icon={<Heart />}
        description="Humidity"
      >
        <p className="text-green-800 font-medium">{humidity.text}</p>
        <p className="text-green-700 text-sm">{humidity.level}</p>
      </CareInformationContainer>

      <CareInformationContainer
        color="purple"
        icon={<Leaf />}
        description="Care Level"
      >
        <div className="flex items-center">
          <span className="text-purple-800 font-medium">{careLevel.text}</span>
        </div>
      </CareInformationContainer>

      <CareInformationContainer
        color="gray"
        icon={<Calendar />}
        description="Last Updated"
      >
        <p className="text-gray-700 text-sm">
          {updatedAt
            ? new Date(updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Not available"}
        </p>
      </CareInformationContainer>
    </div>
  );
}
