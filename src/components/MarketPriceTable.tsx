import type { Market } from "@/lib/utils";

import { banglaNumber } from "@/lib/utils";

interface MarketPriceTableProps {
  markets: Market[];
}

export default function MarketPriceTable({
  markets,
}: MarketPriceTableProps) {
  return (
    <div className="mt-8">

      {/* table heading */}
      <h2 className="mb-4 text-lg font-bold text-[#1B2B20]">
        বাজারভিত্তিক আজকের দাম
      </h2>

      {/* table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#E5EBE7]">

        <table className="w-full min-w-[650px] border-collapse text-left">

          {/* Table Header */}
          <thead className="bg-[#F7FAF8]">
            <tr className="text-xs font-semibold text-gray-600">

              <th className="px-4 py-4">
                বাজার</th>

              <th className="px-4 py-4">
                বিভাগ</th>

              <th className="px-4 py-4">
                সর্বনিম্ন</th>

              <th className="px-4 py-4">
                সর্বোচ্চ</th>

              <th className="px-4 py-4">
                গড়
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>

            {markets.map((market, index) => {
              const average =
                (market.min + market.max) / 2;

              return (
                <tr
                  key={`${market.market}-${index}`}
                  className={`
                    border-t
                    border-[#E5EBE7]
                    text-sm
                    text-gray-700
                    transition
                    hover:bg-green-50

                    ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-[#F2F7F3]"
                    }
                  `}
                >

                  {/* market */}
                  <td className="px-4 py-3 font-medium">
                    {market.market}
                  </td>

                  {/* division */}
                  <td className="px-4 py-3">
                    {market.division}
                  </td>

                  {/* minimum */}
                  <td className="px-4 py-3">
                    {banglaNumber(market.min)} টাকা
                  </td>

                  {/* maximum */}
                  <td className="px-4 py-3">
                    {banglaNumber(market.max)} টাকা
                  </td>

                  {/* Avrage */}
                  <td className="px-4 py-3 font-semibold">
                    {banglaNumber(average)} টাকা
                  </td>

                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}