import NavbarLogo from "./NavbarLogo";
import CategoryNav from "./CategoryNav";
import AuthButtons from "./AuthButtons";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  return (
    <header className="relative z-40 w-full bg-white">

      {/* top navbar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          {/* logor jonno */}
          <NavbarLogo />

          {/* authentication er jonno */}
          <AuthButtons />

        </div>
      </div>

      {/* Category nav er jonno  */}
      <CategoryNav />

      {/*  Marquee er jonno price ticker */}
      <PriceTicker />

    </header>
  );
}