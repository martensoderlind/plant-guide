import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Leaf className="h-8 w-8 text-emerald-600" />
          <span>Plant guide</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href={"/"}
            className="text-gray-200 hover:text-emerald-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/guides"}
            className="text-gray-200 hover:text-emerald-400 transition-colors"
          >
            Guides
          </Link>
          <Link
            href={"/Tools"}
            className="text-gray-200 hover:text-emerald-400 transition-colors"
          >
            Tools
          </Link>
          <Link
            href={"/about-us"}
            className="text-gray-200 hover:text-emerald-400 transition-colors"
          >
            About us
          </Link>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors">
            Start Today
          </button>
        </div>
      </div>
    </nav>
  );
}
