import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">Plant guide</span>
            </div>
            <p className="text-gray-400">
              Your partner for a greener home and a healthier lifestyle.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Guides</h3>
            <div className="space-y-2">
              <Link
                href="/plant-guides"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Indoor plants
              </Link>
              <Link
                href="/plant-guides"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Outdoor plants
              </Link>
              <Link
                href="/plant-guides"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Plant diseases
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <div className="space-y-2">
              <Link
                href="/watering-calender"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Watering calendar
              </Link>
              <Link
                href="/plant-identification"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Plant identification{" "}
              </Link>
              <Link
                href="/light-meter"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Light Meter
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Community
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Plant guide. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
