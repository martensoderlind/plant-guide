import Articles from "@/features/articles/components/articles";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <div>
      <Articles currentPage={currentPage} />
    </div>
  );
}
