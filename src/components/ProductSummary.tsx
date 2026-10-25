import type { Product } from "@/lib/utils";

import {
  getBanglaUnit,
  banglaNumber,
} from "@/lib/utils";

interface ProductSummaryProps {
  product: Product;
}

export default function ProductSummary({
  product,
}: ProductSummaryProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[#E5EBE7] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

      {/* Left - Poduct Info */}
      <div className="flex items-center gap-4">

        {/* Product emoji */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F1F6F2] text-4xl">
          {product.image}
        </div>

        {/* Product details */}
        <div>

          <h1 className="text-xl font-bold text-[#1B2B20] sm:text-2xl">
            {product.nameBn}</h1>

          <p className="mt-1 text-sm text-gray-500">
            প্রতি {getBanglaUnit(product.unit)} ·{" "}
            {product.categoryNameBn}</p>

          <p className="mt-1 text-xs text-gray-400">
            বাংলাদেশের বিভিন্ন বাজারের সর্বশেষ দাম</p>

        </div>
      </div>

      {/* Right - Today's Price */}
      <div className="rounded-xl bg-[#F3F7F4] px-6 py-4 text-center sm:min-w-[135px]">

        <p className="text-xs text-gray-500">
          আজকের দাম</p>

        <h2 className="mt-1 text-2xl font-bold text-[#1B2B20]">
          {banglaNumber(product.today)}</h2>

        <p className="text-xs text-gray-500">
          টাকা / {getBanglaUnit(product.unit)}</p>

        {/* Price change */}
        <p
          className={`mt-2 text-xs font-semibold ${
            isUp
              ? "text-red-500"
              : isDown
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {banglaNumber(Math.abs(product.change.pct))}%
        </p>

      </div>
    </div>
  );
}