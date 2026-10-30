"use client";

import { useEffect, useState, Suspense } from "react";

import HeroBanner from "@/components/HeroBanner";
import PriceIncrease from "@/components/PriceIncrease";
import PriceDecrease from "@/components/PriceDecrease";
import AllProducts from "@/components/AllProducts";

import type { Product } from "@/lib/utils";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Products fetch failed");
        }

        const data = await res.json();

        const productList: Product[] = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.data?.products)
              ? data.data.products
              : [];

        setProducts(productList);
      } catch (error) {
        console.error("Products Error:", error);
        setError("পণ্যের তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F7F3]">

      {/* Hero Banner */}
      <Suspense
        fallback={
          <div className="py-10 text-center text-gray-500">
            ব্যানার লোড হচ্ছে...
          </div>
        }
      >
        <HeroBanner />
      </Suspense>

      {/* Product Sections */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              পণ্যের তথ্য লোড হচ্ছে...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            <PriceIncrease products={products} />

            <PriceDecrease products={products} />

            <AllProducts products={products} />
          </>
        )}

      </div>
    </div>
  );
}