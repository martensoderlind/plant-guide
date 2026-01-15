import Container from "@/shared/components/container";
import PlantGuidePageFallback from "@/features/plant-guides/components/plant-guide-page-fallback";
import PlantPage from "@/features/plant-guides/components/plant-page";
import { Suspense } from "react";
import ContainerR from "@/shared/components/container-r";
import PlantPageR from "@/features/plant-guides/components/redesign/plant-page-r";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (process.env.PLANTGUIDE_REDESIGN === "true") {
    return (
      <div className="bg-gray-100">
        <Suspense fallback={<PlantGuidePageFallback />}>
          <ContainerR>
            <PlantPageR slug={slug} />
          </ContainerR>
        </Suspense>
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<PlantGuidePageFallback />}>
        <Container>
          <PlantPage slug={slug} />
        </Container>
      </Suspense>
    </div>
  );
}
