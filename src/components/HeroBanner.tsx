import Image from "next/image";
import Herologo from "../assets/bazar-hero.png"

export default function HeroBanner() {
  const date = new Date();

  const banglaDate = date.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="w-full bg-[#F1F7F3] px-4 py-8 sm:px-6 lg:px-8">

      {/* Hero Container */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 rounded-[22px] border border-[#E1EAE4] bg-white px-5 py-8 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-12">

        {/* left content */}
        <div className="flex flex-col items-start">

     
          <span className="mb-4 inline-block rounded-full bg-[#E3F5EA] px-4 py-1.5 text-xs font-medium text-[#008C45]">
            {banglaDate}
          </span>

        
          <h1 className="text-3xl font-bold leading-tight text-[#1B2B20] sm:text-4xl lg:text-[42px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#007A3D] hover:shadow-lg"
          >সব পণ্য দেখুন</a>

        </div>

        {/* right image */}
        <div className="flex items-center justify-center lg:justify-end">

          <div className="relative h-[220px] w-[260px] sm:h-[280px] sm:w-[340px] lg:h-[320px] lg:w-[400px]">

            <Image
              src={Herologo}
              alt="বাজারের সবজি ও ফলের ঝুড়ি"
              fill
              priority
              className="object-contain"
            />

          </div>

        </div>

      </div>
    </section>
  );
}