import PlantGuidePageFallback from "@/features/plant-guides/components/plant-guide-page-fallback";
import { Suspense } from "react";
import ContainerR from "@/shared/components/container-r";
import PlantPage from "@/features/plant-guides/components/redesign/plant-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-gray-100">
      <Suspense fallback={<PlantGuidePageFallback />}>
        <ContainerR>
          <PlantPage slug={slug} />
        </ContainerR>
      </Suspense>
    </div>
  );
}
