import { verifySession } from "@/app/lib/dal";
import { fetchPost } from "../getpost";
import { notFound } from "next/navigation";
import icons from "@/static_resources/icons";
import Link from "next/link";
import UpdatePostForm from "@/partials/update_post_form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await verifySession();
  if (!user) notFound();
  const post = await fetchPost(id);
  if (post.author.email != user.email) notFound();

  return (
    <>
    <title>{`${post.title} | Edit`}</title>
      <section className="m-4">
        <div className="max-w-7xl mx-auto my-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-medium text-(--color-light) hover:opacity-50 mb-4"
          >
            <div className="w-5">{icons.get("arrow left")}</div>Back to Home
          </Link>
          <UpdatePostForm post={post}/>
        </div>
      </section>
    </>
  );
}
