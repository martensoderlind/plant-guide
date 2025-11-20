import { userService } from "../instance";
import AuthorArticle from "./author-article";

type Props = {
  authorId: string;
};

export default async function AuthorArticles({ authorId }: Props) {
  const articles = await userService.getAuthorArticles(authorId);
  if (!articles) {
    return (
      <div className="rounded-2xl p-6 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-4">Articles by This Author</h2>
        <p>No articles from this author are available.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl p-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Articles by this author</h2>
      <ul className="space-y-4">
        {articles.map((article, idx: number) => (
          <AuthorArticle key={idx} article={article} />
        ))}
      </ul>
    </div>
  );
}
