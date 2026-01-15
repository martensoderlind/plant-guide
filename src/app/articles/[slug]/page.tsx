import Container from "@/shared/components/container";
import Article from "@/features/articles/components/article";
import ArticleR from "@/features/articles/components/redesign/article-r";
import ContainerR from "@/shared/components/container-r";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (process.env.ARTICLE_REDESIGN === "true") {
    return (
      <div className="bg-gray-100">
        <ContainerR>
          <ArticleR slug={slug} />
        </ContainerR>
      </div>
    );
  }
  return (
    <div>
      <Container>
        <Article slug={slug} />
      </Container>
    </div>
  );
}
