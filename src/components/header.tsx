"use client";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const { isSignedIn } = useAuth();
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
              className={`text-gray-200 hover:text-emerald-400 transition-colors ${
                isActive("/") ? "border-b border-b-gray-200 border-solid" : ""
              } `}
            >
              Home
            </Link>
            <Link
              href={"/plant-guides"}
              className={`text-gray-200 hover:text-emerald-400 transition-colors ${
                isActive("/plant-guides") &&
                "border-b border-b-gray-200 border-solid"
              } `}
            >
              Plants
            </Link>
            <Link
              href={"/articles"}
              className={`text-gray-200 hover:text-emerald-400 transition-colors ${
                isActive("/articles") &&
                "border-b border-b-gray-200 border-solid"
              } `}
            >
              Articles
            </Link>
            <Link
              href={"/tools"}
              className={`text-gray-200 hover:text-emerald-400 transition-colors ${
                isActive("/tools") && "border-b border-b-gray-200 border-solid"
              } `}
            >
              Tools
            </Link>
            <Link
              href={"/about-us"}
              className={`text-gray-200 hover:text-emerald-400 transition-colors ${
                isActive("/about-us") &&
                "border-b border-b-gray-200 border-solid"
              } `}
            >
              About us
            </Link>
            {isSignedIn ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <button
                className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <span>Start Today</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col pt-2 w-1/10 mx-auto">
          <SignedOut>
            <SignInButton>
              <button className="my-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                <span>Sign in</span>
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}
