import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // Check Better Auth Session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // User Not Logged In
  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  // User Logged In
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <h1 className="text-2xl font-bold">
        Product Details
      </h1>

      <p className="mt-3 text-gray-500">
        Product Slug: {slug}
      </p>

    </div>
  );
}