import Link from "next/link";
import Image from "next/image";
import { articlesService } from "../../instance";

type Props = {
  id: string;
  updated_at: Date;
};

export default async function AuthorHeaderR({ id, updated_at }: Props) {
  const author = await articlesService.getArticleAuthor(id);
  if (!author) {
    return null;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="flex flex-col mr-4 border-b border-gray-300 w-50">
      <div className="text-sm text-gray-500 flex flex-row items-center">
        Author
      </div>
      <Link href={`/articles/author/${author.slug}`}>
        <div className="flex items-center pb-2">
          {author.avatarUrl ? (
            <Image
              className="h-10 w-10 rounded-full mr-2"
              width={500}
              height={500}
              src={author.avatarUrl}
              alt={`${author.fullName || author.username}'s avatar`}
            />
          ) : (
            <div>
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4"></div>
              <p className="text-sm font-medium text-gray-600">
                {(author.fullName || author.username).charAt(0).toUpperCase()}
              </p>
            </div>
          )}
          <div className="flex flex-col items-left space-x-2">
            <p className="text-m font-medium text-gray-900">
              {author.fullName || author.username}
            </p>
            <div className="text-xs text-gray-500">
              {updated_at && <p>{formatDate(updated_at)}</p>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
