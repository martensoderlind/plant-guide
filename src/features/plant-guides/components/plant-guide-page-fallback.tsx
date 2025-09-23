import {
  Calendar,
  Droplets,
  Heart,
  Leaf,
  Sun,
  Thermometer,
} from "lucide-react";

export default function PlantGuidePageFallback() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden"></div>
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`}
          ></span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <div className="h-6 w-32 bg-gray-200 rounded mt-2"></div>
          </h1>
          <div className="text-lg text-gray-600 italic">
            <div className="h-3 w-32 bg-gray-200 rounded mt-2"></div>
          </div>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-gray-700 text-lg leading-relaxed">
            {" "}
            <div className="h-32 w-full bg-gray-200 rounded mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Droplets className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-900">Watering</h3>
            </div>
            <div className="text-blue-800">
              Every <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>{" "}
              days
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Sun className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-900">Light</h3>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
            <div className="mt-2 bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full transition-all duration-300"></div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Thermometer className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-900">
                Temperature
              </h3>
            </div>
            <div className="text-red-800">
              <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div> -
              <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Heart className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-900">Humidity</h3>
            </div>
            <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
            <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Leaf className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-purple-900">
                Care Level
              </h3>
            </div>
            <div className="flex items-center">
              <span className="text-purple-800 font-medium">
                <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Calendar className="h-6 w-6 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Last Updated
              </h3>
            </div>
            <div className="text-gray-700 text-sm">
              <div className="h-3 w-20 bg-gray-200 rounded mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
