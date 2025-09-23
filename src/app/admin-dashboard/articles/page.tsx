import AdminArticles from "@/features/admin-dashboard/components/admin-articles/admin-articles";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="min-h-screen">
      <div>
        <AdminArticles currentPage={currentPage} />
      </div>
    </div>
  );
}
