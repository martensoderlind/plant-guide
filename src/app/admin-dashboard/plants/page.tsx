import AdminPlants from "@/features/admin-dashboard/components/admin-plants/admin-plants";

type Props = {
  searchParams: { page?: string };
};

export default function Page({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <div className="min-h-screen">
      <div>
        <AdminPlants currentPage={currentPage} />
      </div>
    </div>
  );
}
