import ArticleR from "@/features/articles/components/article/article";
import ContainerR from "@/shared/components/container-r";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="bg-gray-100">
      <ContainerR>
        <ArticleR slug={slug} />
      </ContainerR>
    </div>
  );
}
