"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { signIn } from "@/lib/auth-client";

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered") === "true";

    const requestedURL =
        searchParams.get("callbackURL") || "/";

    const callbackURL =
        requestedURL.startsWith("/") &&
            !requestedURL.startsWith("//") &&
            !requestedURL.startsWith("/\\")
            ? requestedURL
            : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const [error, setError] = useState("");

    // Email Login
    const handleLogin = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const { error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                setError(
                    error.message || "ইমেইল অথবা পাসওয়ার্ড ভুল।"
                );
                return;
            }

            router.push(callbackURL);
            router.refresh();
        } catch (error) {
            console.error(error);
            setError("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    // Social Login
    const handleSocialLogin = async (
        provider: "google" | "github"
    ) => {
        setError("");
        setSocialLoading(provider);

        try {
            const { error } = await signIn.social({
                provider,
                callbackURL,
            });

            if (error) {
                setError(
                    error.message || "Social Login ব্যর্থ হয়েছে।"
                );
                setSocialLoading("");
            }
        } catch (error) {
            console.error(error);
            setError("Social Login করতে সমস্যা হয়েছে।");
            setSocialLoading("");
        }
    };

    return (
        <div className="flex min-h-[75vh] items-center justify-center bg-[#F1F7F3] px-4 py-12">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="mb-7 text-center">
                    <h1 className="text-3xl font-bold text-[#1B2B20]">
                        সাইন ইন
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও ব্যক্তিগত প্রোফাইল
                        দেখতে লগইন করুন।
                    </p>
                </div>

                {registered && (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                        ✅ আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।
                        এখন সাইন ইন করুন।
                    </div>
                )}

                {/* Login */}
                <div className="rounded-2xl border border-[#E5EBE7] bg-white p-6 shadow-sm sm:p-8">

                    <form
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600"
                            />
                        </div>

                        {/* Pass */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="আপনার পাসওয়ার্ড"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                            >
                                {error}
                            </div>
                        )}

                        {/* btn */}
                        <button
                            type="submit"
                            disabled={loading || Boolean(socialLoading)}
                            className="w-full cursor-pointer rounded-lg bg-[#008C45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "সাইন ইন হচ্ছে..."
                                : "সাইন ইন"}
                        </button>

                    </form>


                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* social Login */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        {/* Google */}
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("google")}
                            disabled={loading || Boolean(socialLoading)}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                        >
                            <span className="text-lg font-bold text-[#4285F4]">
                                G
                            </span>

                            {socialLoading === "google"
                                ? "অপেক্ষা করুন..."
                                : "Google দিয়ে চালিয়ে যান"}
                        </button>

                        {/* GitHub */}
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("github")}
                            disabled={loading || Boolean(socialLoading)}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-current"
                                aria-hidden="true"
                            >
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.13c-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.27-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.18A10.95 10.95 0 0 1 12 6.32c.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.78.11 3.07.73.81 1.18 1.84 1.18 3.1 0 4.42-2.68 5.38-5.24 5.67.41.35.77 1.03.77 2.08v3.1c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                            </svg>

                            {socialLoading === "github"
                                ? "অপেক্ষা করুন..."
                                : "GitHub দিয়ে চালিয়ে যান"}
                        </button>

                    </div>


                    <p className="mt-6 text-center text-sm text-gray-500">
                        অ্যাকাউন্ট নেই?{" "}

                        <Link
                            href="/signup"
                            className="font-semibold text-green-700 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>

                </div>


                <p className="mt-6 text-center text-xs text-gray-400">
                    — চোখ রেখে কিনুন —
                </p>

            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[75vh] items-center justify-center bg-[#F1F7F3]">
                    <p className="text-sm text-gray-500">
                        লোড হচ্ছে...
                    </p>
                </div>
            }
        >
            <SignInForm />
        </Suspense>
    );
}