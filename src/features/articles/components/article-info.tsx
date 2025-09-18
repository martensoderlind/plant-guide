import { Author } from "@/features/iam/types";
import AuthorHeader from "./author-header";
import { Calendar, Clock, Eye, Heart } from "lucide-react";

type Props = {
  published_at: Date | null;
  reading_time_minutes: number | null;
  views: number | null;
  likes: number | null;
};

export default function ArticleInfo({
  published_at,
  reading_time_minutes,
  views,
  likes,
}: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-wrap gap-6 text-sm text-gray-300  pb-6">
        {published_at && (
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>Published {formatDate(published_at)}</span>
          </div>
        )}
        {reading_time_minutes && (
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{reading_time_minutes} estimated reading time</span>
          </div>
        )}
        {views && (
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{views.toLocaleString()} views</span>
          </div>
        )}
        {likes && (
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span>{likes} likes</span>
          </div>
        )}
      </div>
    </div>
  );
}
