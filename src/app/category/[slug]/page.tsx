import CategoryProducts from "@/components/CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  return (
    <CategoryProducts slug={slug} />
  );
}