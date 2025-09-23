import PlantGuidePageFallback from "@/features/plant-guides/components/plant-guide-page-fallback";
import PlantPage from "@/features/plant-guides/components/plant-page";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Suspense fallback={<PlantGuidePageFallback />}>
        <PlantPage slug={slug} />
      </Suspense>
    </div>
  );
}
