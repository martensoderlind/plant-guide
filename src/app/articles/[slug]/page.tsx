import Container from "@/components/container";
import Article from "@/features/articles/components/article";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Container>
        <Article slug={slug} />
      </Container>
    </div>
  );
}
