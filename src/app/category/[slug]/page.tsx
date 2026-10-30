import { Suspense } from "react";
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

async function CategoryContent({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  if (!validCategories.includes(slug)) {
    notFound();
  }

  return <CategoryProducts slug={slug} />;
}

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F7F3] py-20 text-center">
          <p className="text-gray-500">
            ক্যাটাগরির পণ্য লোড হচ্ছে...
          </p>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}