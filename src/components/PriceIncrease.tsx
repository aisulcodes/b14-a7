import ProductCard from "./ProductCard";

import type { Product } from "@/lib/utils";

interface PriceIncreaseProps {
  products: Product[];
}

export default function PriceIncrease({
  products,
}: PriceIncreaseProps) {
  // Filter increased products
  const increasedProducts = products
    .filter((product) => product.change.dir === "up")

    // Highest percentage first
    .sort(
      (a, b) =>
        b.change.pct - a.change.pct
    )


    .slice(0, 6);

  return (
    <section className="mb-12">

      {/* Section Heading */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-sm font-bold text-red-500">
          ▲
        </span>

        <h2 className="text-xl font-bold text-[#1B2B20]">
          আজ দাম বেড়েছে</h2>
      </div>

      {/* product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {increasedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
}