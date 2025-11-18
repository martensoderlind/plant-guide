import { articlesService } from "../instance";
import Image from "next/image";

type Props = {
  id: string;
};

export default async function AuthorHeader({ id }: Props) {
  const author = await articlesService.getArticleAuthor(id);
  if (!author) {
    return null;
  }
  return (
    <div className="text-sm text-gray-500 flex flex-row items-center">
      Author:
      <span>
        <div className="flex items-center">
          <div className="mx-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-500">
                {author.fullName || author.username}
              </p>
            </div>
          </div>
          {author.avatarUrl ? (
            <Image
              className="h-10 w-10 rounded-full mr-4"
              width={500}
              height={500}
              src={author.avatarUrl}
              alt={`${author.fullName || author.username}'s avatar`}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
              <span className="text-sm font-medium text-gray-600">
                {(author.fullName || author.username).charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </span>
    </div>
  );
}
