"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(
          Array.isArray(data) ? data : data.data || []
        );
      } catch (error) {
        console.log("Category Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-4 text-center text-sm text-gray-500">
        ক্যাটাগরি লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-start gap-3 overflow-x-auto px-4 py-3 md:justify-center md:gap-6">

        {categories.map((category) => {
          const isActive =
            pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}

      </nav>
    </div>
  );
}