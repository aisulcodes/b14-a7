import type { Market } from "@/lib/utils";

import { banglaNumber } from "@/lib/utils";

interface PriceSummaryProps {
  markets: Market[];
}

export default function PriceSummary({
  markets,
}: PriceSummaryProps) {
  if (markets.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        দামের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  // Minimum P
  const minimumPrice = Math.min(
    ...markets.map((market) => market.min)
  );

  // Maximum p
  const maximumPrice = Math.max(
    ...markets.map((market) => market.max)
  );

  // Average P
  const totalAverage = markets.reduce(
    (total, market) =>
      total + (market.min + market.max) / 2,
    0
  );

  const averagePrice = totalAverage / markets.length;

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-[#1B2B20]">
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* minimum */}
        <div className="rounded-xl border border-[#E5EBE7] bg-white p-5">
          <p className="text-xs text-gray-500">
            সর্বনিম্ন দাম
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-600">
            {banglaNumber(minimumPrice)} টাকা
          </h3>

          <p className="mt-2 text-xs text-gray-400">
            সব বাজারের মধ্যে সর্বনিম্ন
          </p>
        </div>

        {/* maximum */}
        <div className="rounded-xl border border-[#E5EBE7] bg-white p-5">
          <p className="text-xs text-gray-500">
            সর্বোচ্চ দাম
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">
            {banglaNumber(maximumPrice)} টাকা
          </h3>

          <p className="mt-2 text-xs text-gray-400">
            সব বাজারের মধ্যে সর্বোচ্চ</p>
        </div>

        {/* Avrge */}
        <div className="rounded-xl border border-[#E5EBE7] bg-white p-5">
          <p className="text-xs text-gray-500">
            গড় দাম</p>

          <h3 className="mt-2 text-2xl font-bold text-green-700">
            {banglaNumber(averagePrice)} টাকা</h3>

          <p className="mt-2 text-xs text-gray-400">
            বাজারগুলোর আনুমানিক গড়</p>
        </div>

      </div>
    </div>
  );
}