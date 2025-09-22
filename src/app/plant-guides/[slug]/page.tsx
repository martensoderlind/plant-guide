import PlantPage from "@/features/plant-guides/components/plant-page";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <PlantPage slug={slug} />
    </div>
  );
}
