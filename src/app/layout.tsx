import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { Suspense } from "react";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="light">
      <body
        className={`${hindSiliguri.className} bg-white text-black`}
      >
        <Suspense
          fallback={
            <div className="py-4 text-center text-sm text-gray-500">
              নেভিগেশন লোড হচ্ছে...
            </div>
          }
        >
          <Navbar />
        </Suspense>

        <main>{children}</main>

        <Footer />

        <ToastProvider />
      </body>
    </html>
  );
}