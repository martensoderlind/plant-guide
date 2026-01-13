import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function Tools() {
  if (process.env.ENABLE_TOOLS === "false") {
    return (
      <div className="max-w-4xl mx-auto py-8 flex flex-col justify-items-center">
        <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight mx-auto">
          This feature is currently disabled.
        </h1>
        <Link href={"/"} className="mx-auto flex flex-row">
          <span className="text-xl md:text-xl font-bold mb-4 leading-tight mr-2">
            Return to home page
          </span>
          <Undo2 />
        </Link>
      </div>
    );
  }
  console.log("tools", process.env.ENABLE_TOOLS);

  return (
    <div className="flex flex-col">
      <p>Tools</p>
      <a
        href="#"
        className="block text-gray-400 hover:text-white transition-colors"
      >
        Watering calendar
      </a>
      <a
        href="#"
        className="block text-gray-400 hover:text-white transition-colors"
      >
        Plant identification{" "}
      </a>
    </div>
  );
}
