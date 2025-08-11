"use client";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href={"/"} className="flex items-center space-x-8">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold">Plant guide</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"/"}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href={"/plants"}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              Plants
            </Link>
            <Link
              href={"/articles"}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              Articles
            </Link>
            <Link
              href={"/tools"}
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
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <Link
              href={"/"}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href={"/articles"}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              Articles
            </Link>
            <Link
              href={"/tools"}
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
      )}
    </nav>
  );
}
