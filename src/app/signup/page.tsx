"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { toast } from "sonner";
import { signUp, signIn, signOut } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (!email.trim()) {
      toast.error("আপনার ইমেইল লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (result.error) {
        toast.error(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      const logoutResult = await signOut();

      if (logoutResult.error) {
        console.error("Sign Out Error:", logoutResult.error);
      }

      router.replace("/signin?registered=true");
      router.refresh();

    } catch (error) {
      console.error("Registration Error:", error);

      toast.error(
        "রেজিস্ট্রেশন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "Social Login ব্যর্থ হয়েছে।"
        );
      }
    } catch (error) {
      console.error("Social Login Error:", error);

      toast.error("Social Login করতে সমস্যা হয়েছে।");
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-[#F1F7F3] px-4 py-12">

      <div className="w-full max-w-md">

        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-[#1B2B20]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            নিজের বাজার খরচ আর দাম সহজে বিশ্লেষণ করুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5EBE7] bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600"
              />
            </div>

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
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="পাসওয়ার্ড দেখুন বা লুকান"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="আবার লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label="নিশ্চিতকরণ পাসওয়ার্ড দেখুন বা লুকান"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="w-full rounded-lg bg-[#008C45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              অথবা
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading || Boolean(socialLoading)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <FaGoogle size={17} className="text-[#4285F4]" />

              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading || Boolean(socialLoading)}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <FaGithub size={19} />

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>

          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট আছে?{" "}

            <Link
              href="/signin"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন ইন করুন
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