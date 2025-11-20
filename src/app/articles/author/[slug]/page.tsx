import Container from "@/components/container";
import AuthorProfile from "@/features/user/components/author-profile";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Container>
        <AuthorProfile slug={slug} />
      </Container>
    </div>
  );
}
