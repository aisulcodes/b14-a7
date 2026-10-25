import Link from "next/link";

import {
  Product,
  getBanglaUnit,
  banglaNumber,
} from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="
        group
        block
        rounded-xl
        border
        border-[#E6EDE8]
        bg-white
        p-4
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-green-200
        hover:shadow-md
      "
    >
      {/* product info */}
      <div className="flex items-start gap-3">

        {/* product emoji */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F3F7F4]
            text-2xl
          "
        >
          {product.image}
        </div>

        {/* Product Name + Unit */}
        <div className="min-w-0">
          <h3
            className="
              text-sm
              font-semibold
              text-[#1B2B20]
              transition
              group-hover:text-green-700
              sm:text-base
            "
          >
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {getBanglaUnit(product.unit)}
          </p>
        </div>

      </div>

      {/* Price Section */}
      <div className="mt-5">

        <p className="text-xs text-gray-500">
          আজকের দাম
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">

          {/* Price */}
          <h4 className="text-lg font-bold text-[#1B2B20]">
            {banglaNumber(product.today)} টাকা
          </h4>

          {/* Price Change Badge */}
          <span
            className={`
              inline-flex
              shrink-0
              items-center
              gap-1
              rounded-md
              px-2
              py-1
              text-xs
              font-semibold

              ${
                isUp
                  ? "bg-red-50 text-red-500"
                  : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }
            `}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}

            {banglaNumber(
              Math.abs(product.change.pct)
            )}
            %
          </span>

        </div>
      </div>
    </Link>
  );
}