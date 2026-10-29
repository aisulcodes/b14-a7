"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo-icon.png";
import { useEffect, useState } from "react";

export default function NavbarLogo() {
    const [banglaDate, setBanglaDate] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            const date = new Date();

            const formattedDate = date.toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Dhaka",
            });

            setBanglaDate(formattedDate);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Link href="/" className="flex items-center gap-2">
            {/* logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#008C45] sm:h-14 sm:w-14">
                <Image
                    src={Logo}
                    alt="বাজার দর Logo"
                    width={25}
                    height={25}
                    className="object-contain"
                />
            </div>


            {/* text */}
            <div>
                <h1 className="text-lg font-bold text-gray-900">বাজার দর</h1>

                <p className="text-[11px] text-gray-500">{banglaDate}</p>
            </div>
        </Link>
    );
}