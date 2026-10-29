import Link from "next/link";
import { House, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[75vh] items-center justify-center bg-[#F1F7F3] px-4 py-16">

            <div className="mx-auto max-w-lg text-center">

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <SearchX
                        size={48}
                        className="text-[#008C45]"
                    />
                </div>

                <h1 className="text-7xl font-bold text-[#008C45]">
                    404
                </h1>

                <h2 className="mt-5 text-2xl font-bold text-[#1B2B20]">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                    আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে
                    অথবা URL-টি সঠিক নয়।
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                    <House size={18} />
                    হোম পেজে ফিরে যান
                </Link>

            </div>

        </div>
    );
}