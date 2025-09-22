import { Article } from "@/features/articles/schema";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  article: Article;
};
export default function ArticleCard({ article }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
      <div className="relative h-48 w-full bg-gradient-to-br from-green-100 to-emerald-200">
        {article.featured_image_url ? (
          <Image
            width={500}
            height={500}
            src={article.featured_image_url}
            alt={article.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {article.title}
          </h2>
          <p className="text-sm italic text-gray-500 mb-3">{article.excerpt}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex text-gray-500 text-xs">
              <Eye className="w-4 h-4" />
              <span>Views {article.views}</span>
            </div>
            <div className="flex text-gray-500 text-xs mx-4">
              <Heart size={18} />
              <span>Like ({article.likes})</span>
            </div>
          </div>
          <Link
            href={"/articles/" + article.slug}
            className=" text-gray-700 hover:underline text-sm font-medium self-start"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}
