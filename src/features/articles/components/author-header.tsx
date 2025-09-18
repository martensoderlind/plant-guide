import { articlesService } from "../instance";

type Props = {
  id: string;
};

export default async function AuthorHeader({ id }: Props) {
  const author = await articlesService.getArticleAuthor(id);
  return (
    <div>
      <div className="flex items-center">
        <div className="mx-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-gray-500">
              {author.fullName || author.username}
            </div>
          </div>
        </div>
        {author.avatarUrl ? (
          <img
            className="h-10 w-10 rounded-full mr-4"
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
    </div>
  );
}
