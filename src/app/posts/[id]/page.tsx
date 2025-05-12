import Link from "next/link";
import { fetchPost } from "./getpost";
import CommentForm from "@/partials/comment_form";
import { verifySession } from "@/app/lib/dal";
import CommentCard from "@/partials/comment_card";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPost(id);
  const date = new Date(post.created_at);
  const user = await verifySession();
  return (
    <>
      <title>{`A Blogs | ${post.title}`}</title>
      <section className="mx-4 mt-4 mb-16">
        <div className="max-w-7xl m-auto py-2">
          <div className="flex items-center gap-2">
            <Link
              className="font-heading font-medium hover:text-(--color-light)"
              href="/"
            >
              Home
            </Link>
            <span className="font-heading text-sm">❯</span>
            <span className="font-heading font-medium text-(--color-light)">
              {post.title}
            </span>
          </div>
        </div>
        <article className="max-w-4xl mx-auto mt-4 mb-8">
          <h1 className="text-4xl font-semibold font-heading">{post.title}</h1>
          <div className="flex gap-2 items-center my-4">
            <div className="w-10 h-10 bg-(--color-light) text-white font-text font-semibold flex justify-center items-center uppercase">
              {post.author.username
                ? post.author.username.charAt(0)
                : post.author.email.charAt(0)}
            </div>
            <div>
              <p className="font-text">
                {post.author.username
                  ? post.author.username
                  : post.author.email}
              </p>
              <p className="text-gray-600 font-heading text-sm">
                {[
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                ].join("/")}
              </p>
            </div>
          </div>
          <p className="whitespace-pre-wrap font-text font-[350] leading-8">
            {post.content}
          </p>
          <p className="text-center font-text text-sm font-medium mt-8">
            *** END OF BLOG ***
          </p>
          <hr />
        </article>
        <h1 className="max-w-4xl mx-auto font-heading text-lg font-semibold">
          Comments
        </h1>
        {user && <CommentForm post_id={post.id} />}
        <div className="max-w-4xl mx-auto">
          {post.comments.length > 0 &&
            post.comments.map((value) => (
              <CommentCard comment={value} key={value.id} user={user} />
            ))}
          {post.comments.length == 0 && (
            <p className="font-text mt-2 text-sm text-gray-500">
              There are no existing comments...
            </p>
          )}
        </div>
      </section>
    </>
  );
}
