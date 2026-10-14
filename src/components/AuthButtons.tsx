"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import {
  useSession,
  signOut,
} from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);

    try {
      const result = await signOut();

      if (result.error) {
        console.error(result.error);
        return;
      }

      setOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.log("Logout Error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  // loading
  if (isPending) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
    );
  }

  // user not logged in
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-green-700 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-50 sm:px-4 sm:text-sm"
        >সাইন ইন</Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-700 px-3 py-2 text-xs font-medium text-white hover:bg-green-800 sm:px-4 sm:text-sm"
        >সাইন আপ</Link>
      </div>
    );
  }

  // logged in user
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
      >
        {/* profile image */}
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200"><User size={20} /></div>
        )}

        {/* user Name */}
        <span className="hidden text-sm font-medium text-gray-800 sm:block">{session.user.name}</span>

        <ChevronDown size={14} />
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">

          <div className="border-b px-4 py-3">
            <p className="truncate text-sm font-semibold">{session.user.name}</p>

            <p className="truncate text-xs text-gray-500">{session.user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50"
          >
            <User size={16} />
            আমার প্রোফাইল
          </Link>

          <button
            onClick={handleSignOut}
            disabled={loggingOut}
            className="flex w-full items-center gap-2 border-t px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={16} />

            {loggingOut
              ? "সাইন আউট হচ্ছে..."
              : "সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}