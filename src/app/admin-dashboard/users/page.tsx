import AdminUserDashboard from "@/features/admin-dashboard/components/admin-users/admin-users-dashboard";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  return (
    <div>
      <AdminUserDashboard currentPage={currentPage} />
    </div>
  );
}
