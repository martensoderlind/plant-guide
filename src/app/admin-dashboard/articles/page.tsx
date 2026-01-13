import { getArticleCount } from "@/features/admin-dashboard/actions";
import AdminArticles from "@/features/admin-dashboard/components/admin-articles/admin-articles";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const articleCount = await getArticleCount();

  if (articleCount.ok === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Failed to load article count: {articleCount.error?.message}
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div>
        <AdminArticles
          currentPage={currentPage}
          articleCount={articleCount.data}
        />
      </div>
    </div>
  );
}
