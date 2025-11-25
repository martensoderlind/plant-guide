import ContainerFallback from "@/components/container-fallback";
import PlantGuides from "@/features/plant-guides/components/plant-guides";
import { Suspense } from "react";
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={<ContainerFallback />}>
        <PlantGuides currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
