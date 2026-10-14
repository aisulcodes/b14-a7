"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(
          Array.isArray(data)
            ? data
            : data.data || []
        );
      } catch (error) {
        console.log("Products API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const getBanglaUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";

    return unit;
  };


  const banglaNumber = (number: number) => {
    return number.toLocaleString("bn-BD");
  };

  if (loading) {
    return (
      <div className="border-y border-gray-100 bg-gray-50 py-3 text-center text-xs text-gray-500">
        বাজার দর লোড হচ্ছে...
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-100 bg-[#f8faf9]">

      {/* marquee */}
      <div className="ticker-track flex w-max">

        {[1, 2].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0"
            aria-hidden={copy === 2}
          >
            {products.map((product) => {
              const isUp = product.change.dir === "up";
              const isDown = product.change.dir === "down";

              return (
                <div
                  key={`${copy}-${product.id}`}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-gray-200 px-5 py-3"
                >
                  {/* product emoji */}
                  <span className="text-sm">
                    {product.image}
                  </span>

               
                  <span className="text-xs font-medium text-gray-800 sm:text-sm">
                    {product.nameBn}{" "}
                    {banglaNumber(product.today)}{" "}
                    টাকা/{getBanglaUnit(product.unit)}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      isUp
                        ? "text-red-500"
                        : isDown
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}

                    {" "}
                    {banglaNumber(Math.abs(product.change.pct))}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}

      </div>
    </div>
  );
}