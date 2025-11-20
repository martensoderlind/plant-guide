import { userService } from "../instance";
import AuthorProfileFallback from "./author-profile-fallback";
import Image from "next/image";
import AuthorArticles from "./author-articles";

type Props = {
  slug: string;
};

export default async function AuthorProfile({ slug }: Props) {
  const author = await userService.getAuthorProfile(slug);
  if (!author) {
    return <AuthorProfileFallback />;
  }
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="p-6 bg-white flex gap-6 items-center">
        {author.avatarUrl && (
          <Image
            width={500}
            height={500}
            src={author.avatarUrl}
            alt={author.username}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">
            {author.fullName ?? author.username}
          </h1>
          <p className="text-gray-600">@{author.username}</p>
          <p className="text-gray-700 mt-3">
            {author.bio ?? "No bio available."}
          </p>
        </div>
      </div>
      <AuthorArticles authorId={author.authorId} />
    </div>
  );
}
