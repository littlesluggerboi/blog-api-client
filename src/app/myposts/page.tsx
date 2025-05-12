import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import MyPosts from "@/partials/myposts";
import { Metadata } from "next";
import icons from "@/static_resources/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A Blogs | My Posts",
};

export default async function Page() {
  const user = await verifySession();
  if (!user) redirect("/login");
  const res = await fetch(`${process.env.BACKEND_URL}/posts/myposts`, {
    signal: AbortSignal.timeout(3000),
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const { posts } = await res.json();
  return (
    <>
      <section className="mx-4 mt-12 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-4xl font-bold">My Posts</h2>
            <Link href='/newpost' className="flex text-white gap-2 items-center bg-(--color-light) text-lg font-semibold px-4 py-2 rounded-sm cursor-pointer hover:opacity-50">
              <div className="w-8">{icons.get("plus")}</div>New Post
            </Link>
          </div>
          <MyPosts posts={posts} />
        </div>
      </section>
    </>
  );
}
