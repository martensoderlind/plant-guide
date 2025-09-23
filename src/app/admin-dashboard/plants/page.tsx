import AdminPlants from "@/features/admin-dashboard/components/admin-plants/admin-plants";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  
  return (
    <div className="min-h-screen">
      <div>
        <AdminPlants currentPage={currentPage} />
      </div>
    </div>
  );
}
