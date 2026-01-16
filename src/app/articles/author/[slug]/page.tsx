import AuthorProfile from "@/features/user/components/author-profile";
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
        <AuthorProfile slug={slug} />
      </ContainerR>
    </div>
  );
}
