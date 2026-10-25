import ProductCard from "./ProductCard";

import type { Product } from "@/lib/utils";

interface AllProductsProps {
  products: Product[];
}

export default function AllProducts({
  products,
}: AllProductsProps) {
  return (
    <section
      id="সব-পণ্য"
      className="scroll-mt-8"
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-[#1B2B20]">
          সব পণ্য</h2>

        <p className="mt-2 text-sm text-gray-500">
          দেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের
          সর্বশেষ দাম দেখুন।</p>

      </div>

      {/* products grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}