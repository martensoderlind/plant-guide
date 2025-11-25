import { Eye, Heart, Link } from "lucide-react";

export default async function ArticleContainerFallback() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
        >
          <div className="relative h-48 w-full bg-gray-200">
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm"></div>
          </div>

          <div className="p-4 flex flex-col flex-1 justify-between">
            <div className="animate-pulse">
              <h2 className="bg-gray-300 rounded-xl w-32  h-5"></h2>
              <p className="my-2 bg-gray-300 rounded-xl w-auto  h-15"></p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-gray-500 text-xs">
                  <Eye className="w-4 h-4" />
                  <span className="pl-1">Views </span>
                </div>
                <div className="flex text-gray-500 text-xs mx-4">
                  <Heart className="w-4 h-4" />
                  <span className="pl-1">Like</span>
                </div>
              </div>
              <Link
                href={"/articles/"}
                className=" text-gray-700 hover:underline text-sm font-medium self-start"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
