import ProductCard from "./ProductCard";

import type { Product } from "@/lib/utils";

interface PriceDecreaseProps {
  products: Product[];
}

export default function PriceDecrease({
  products,
}: PriceDecreaseProps) {
    // Filter decreased products
  const decreasedProducts = products
    .filter((product) => product.change.dir === "down")

    .sort(
      (a, b) =>
        a.change.pct - b.change.pct
    )

    .slice(0, 6);

  return (
    <section className="mb-12">


      <div className="mb-5 flex items-center gap-2">

        <span className="text-sm font-bold text-green-600">
          ▼
        </span>

        <h2 className="text-xl font-bold text-[#1B2B20]">আজ দাম কমেছে</h2>

      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {decreasedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </section>
  );
}