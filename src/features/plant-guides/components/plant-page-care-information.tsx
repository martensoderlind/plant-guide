import {
  Calendar,
  Droplets,
  Heart,
  Leaf,
  Sun,
  Thermometer,
} from "lucide-react";

type LightReq = {
  text: string;
  intensity: string;
};
type Humidity = {
  text: string;
  level: string;
};
type CareLevel = {
  text: string;
  color: string;
  icon: string;
};

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
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Droplets className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-blue-900">Watering</h3>
        </div>
        <p className="text-blue-800">
          Every <span className="font-bold">{water_frequency_days}</span> days
        </p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Sun className="h-6 w-6 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-900">Light</h3>
        </div>
        <p className="text-yellow-800 font-medium">{lightReq.text}</p>
        <div className="mt-2 bg-yellow-200 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: lightReq.intensity }}
          ></div>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Thermometer className="h-6 w-6 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-900">Temperature</h3>
        </div>
        <p className="text-red-800">
          <span className="font-bold">{temperature_min}°C</span> -
          <span className="font-bold"> {temperature_max}°C</span>
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Heart className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-900">Humidity</h3>
        </div>
        <p className="text-green-800 font-medium">{humidity.text}</p>
        <p className="text-green-700 text-sm">{humidity.level}</p>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Leaf className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-purple-900">Care Level</h3>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{careLevel.icon}</span>
          <span className="text-purple-800 font-medium">{careLevel.text}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Calendar className="h-6 w-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
        </div>
        <p className="text-gray-700 text-sm">
          {updatedAt
            ? new Date(updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Not available"}
        </p>
      </div>
    </div>
  );
}
