import Article from "@/features/articles/components/article";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Article slug={slug} />
    </div>
  );
}
