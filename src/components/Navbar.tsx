import { Suspense } from "react";

import NavbarLogo from "./NavbarLogo";
import CategoryNav from "./CategoryNav";
import AuthButtons from "./AuthButtons";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  return (
    <header className="relative z-40 w-full bg-white">

      {/* Top Navbar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <NavbarLogo />

          {/* Authentication */}
          <Suspense
            fallback={
              <div className="text-sm text-gray-500">
                Loading...
              </div>
            }
          >
            <AuthButtons />
          </Suspense>

        </div>
      </div>

      {/* Category Navigation */}
      <Suspense
        fallback={
          <div className="py-3 text-center text-sm text-gray-500">
            ক্যাটাগরি লোড হচ্ছে...
          </div>
        }
      >
        <CategoryNav />
      </Suspense>

      {/* Price Ticker */}
      <PriceTicker />

    </header>
  );
}