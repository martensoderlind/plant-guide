import PlantGuides from "@/features/plant-guides/components/plant-guides";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="max-w-7xl mx-auto">
      <PlantGuides currentPage={currentPage} />
    </div>
  );
}
