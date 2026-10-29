"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();

    const { data: session, isPending, refetch } = useSession();

    const [name, setName] = useState("");
    const [nameEdited, setNameEdited] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = session?.user;

    const displayName = nameEdited ? name : (user?.name ?? "");

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!displayName.trim()) {
            toast.error("আপনার নাম লিখুন।");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: displayName.trim(),
            });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
                return;
            }

            await refetch();

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            router.refresh();

        } catch (error) {
            console.error("Profile Update Error:", error);
            toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.replace("/");
            router.refresh();

        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#F1F7F3]">
                <p className="text-sm text-gray-500">
                    প্রোফাইল লোড হচ্ছে...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#F1F7F3]">
                <p className="text-sm text-gray-500">
                    প্রোফাইল দেখতে সাইন ইন করুন।
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[85vh] bg-[#F1F7F3] px-4 py-8">

            <div className="mx-auto w-full max-w-2xl">

                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1B2B20]">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* rprofile*/}
                <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#E5EBE7] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                        {/* Profile img */}
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "Profile"}
                                width={60}
                                height={60}
                                unoptimized
                                className="h-15 w-15 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        {/* User info */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    {/* Logout Button */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <LogOut size={16} />
                        সাইন আউট
                    </button>

                </div>

                {/* Information Card */}
                <div className="rounded-2xl border border-[#E5EBE7] bg-white p-5 sm:p-7">

                    <h2 className="mb-6 text-lg font-semibold text-[#1B2B20]">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate}>

                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={displayName}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameEdited(true);
                                }}
                                required
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#008C45] px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}