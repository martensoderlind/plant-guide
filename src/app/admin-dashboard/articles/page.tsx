import AdminArticles from "@/features/admin-dashboard/components/admin-articles/admin-articles";
import { adminDashboardService } from "@/features/admin-dashboard/instance";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const articleCount = await adminDashboardService.getArticleCount();
  return (
    <div className="min-h-screen">
      <div>
        <AdminArticles currentPage={currentPage} articleCount={articleCount} />
      </div>
    </div>
  );
}
