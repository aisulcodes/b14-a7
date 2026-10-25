"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";

import type { Product } from "@/lib/utils";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryProductsProps {
  slug: string;
}

export default function CategoryProducts({
  slug,
}: CategoryProductsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError("");

      try {
        const [categoryRes, productRes] = await Promise.all([
          fetch(
            "https://openapi.programming-hero.com/api/bazardor/categories"
          ),
          fetch(
            "https://openapi.programming-hero.com/api/bazardor/products"
          ),
        ]);

        if (!categoryRes.ok || !productRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoryData = await categoryRes.json();
        const productData = await productRes.json();

        setCategories(
          Array.isArray(categoryData)
            ? categoryData
            : Array.isArray(categoryData.data)
              ? categoryData.data
              : categoryData.data?.categories || []
        );

        setProducts(
          Array.isArray(productData)
            ? productData
            : Array.isArray(productData.data)
              ? productData.data
              : productData.data?.products || []
        );
      } catch (error) {
        console.error(error);
        setError("তথ্য লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [slug]);

  
  const category = categories.find(
    (item) => item.slug === slug
  );


  const categoryProducts = products.filter(
    (product) => product.category === slug
  );


  const sortedProducts = [...categoryProducts];

  if (sortBy === "low") {
    sortedProducts.sort(
      (a, b) => a.today - b.today
    );
  }

  if (sortBy === "high") {
    sortedProducts.sort(
      (a, b) => b.today - a.today
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F7F3] px-4 py-10">

        <div className="mx-auto max-w-6xl">


          <div className="mb-5 h-24 animate-pulse rounded-xl bg-white" />


          <div className="mb-8 h-16 animate-pulse rounded-xl bg-white" />


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-xl bg-white"
              />
            ))}

          </div>

        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">

        <h2 className="text-2xl font-bold text-red-500">
          কিছু সমস্যা হয়েছে!
        </h2>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>

      </div>
    );
  }


  if (!category || categoryProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">

        <div className="mb-4 text-6xl">
          🛒
        </div>

        <h2 className="text-3xl font-bold text-[#1B2B20]">
          ৪০৪ — কোনো পণ্য পাওয়া যায়নি
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি
          খুঁজে পাওয়া যায়নি।</p>

        <Link
          href="/"
          className="mt-6 rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F7F3] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">


        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#E5EBE7] bg-white p-5 sm:p-6">


          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F2] text-3xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#1B2B20]">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির আজকের দাম ও পরিবর্তন
            </p>
          </div>

        </div>


        <div className="mb-5 flex items-center justify-end gap-3 rounded-xl border border-[#E5EBE7] bg-white px-5 py-4">

          <label
            htmlFor="sort"
            className="text-sm text-gray-500"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low">
              দাম: কম থেকে বেশি
            </option>

            <option value="high">
              দাম: বেশি থেকে কম
            </option>
          </select>

        </div>

        {/* Product count */}
        <p className="mb-4 text-sm text-gray-500">
          মোট {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>
    </main>
  );
}