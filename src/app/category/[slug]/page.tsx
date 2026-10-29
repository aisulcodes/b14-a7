import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const validCategories = [
  "chal",
  "dal",
  "tel",
  "sobji",
  "mach",
  "mangsho",
  "dim-dui",
  "mosla",
];

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  if (!validCategories.includes(slug)) {
    notFound();
  }

  return (
    <CategoryProducts slug={slug} />
  );
}