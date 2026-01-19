import Articles from "@/features/articles/components/articles";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <Articles currentPage={currentPage} />
    </div>
  );
}
