import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { Metadata } from "next";
import Link from "next/link";
import icons from "@/static_resources/icons";
import NewPostForm from "@/partials/new_post_form";

export const metadata: Metadata = {
  title: "A Blogs | New Post",
};

export default async function Page() {
  const user = await verifySession();
  if (!user) redirect("/login");
  return (
    <>
      <section className="m-4">
        <div className="max-w-7xl mx-auto my-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-medium text-(--color-light) hover:opacity-50 mb-4"
          >
            <div className="w-5">{icons.get("arrow left")}</div>Back to Home
          </Link>
          <NewPostForm />
        </div>
      </section>
    </>
  );
}
