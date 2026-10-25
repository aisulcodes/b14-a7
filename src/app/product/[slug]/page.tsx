import Link from "next/link";

import { headers } from "next/headers";

import { redirect, notFound } from "next/navigation";

import { auth } from "@/lib/auth";

import type { Product } from "@/lib/utils";

import ProductSummary from "@/components/ProductSummary";
import PriceSummary from "@/components/PriceSummary";
import MarketPriceTable from "@/components/MarketPriceTable";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductPageProps) {

  const { slug } = await params;


  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  // fetch API
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : data.data?.products || [];


  const product = products.find(
    (item) => item.slug === slug
  );


  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F1F7F3] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">


        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>

        </nav>


        <ProductSummary product={product} />


        <div className="mt-6 rounded-xl border border-[#E5EBE7] bg-white p-5 sm:p-6">

          <PriceSummary markets={product.markets} />

          <MarketPriceTable markets={product.markets} />

        </div>

      </div>
    </main>
  );
}