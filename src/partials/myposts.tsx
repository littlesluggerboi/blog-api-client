"use client";
import { Post } from "@/app/lib/definitions";
import PostCard from "./post";
import icons from "@/static_resources/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deletePost, publishPost } from "@/app/myposts/postActions";

export default function MyPosts(props: { posts: Post[] }) {
  const router = useRouter();
  const deleteAction = (id: number) => {
    const advance = confirm(
      "Are you sure you want to delete this post? Deleting the post will also delete its related comments"
    );
    if (advance) {
      deletePost(id)
        .then(() => router.refresh())
        .catch((err) => alert(err.message));
    }
  };
  const publishAction = (id: number, pulish_value: boolean) => {
    const advance = confirm(
      "Are you sure you want to publish this post? Publishing it will make it visible to everyone website visitor."
    );
    if (advance) {
      publishPost(id, pulish_value)
        .then(() => router.refresh())
        .catch((err) => alert(err.message));
    }
  };
  return (
    <>
      {props.posts.length > 0 && (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {props.posts.map((value) => (
            <PostCard
              key={value.id}
              post={value}
              action={
                <>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => router.push(`/posts/${value.id}`)}
                      className="cursor-pointer rounded-sm p-1 hover:bg-gray-200"
                    >
                      <div className="w-6">{icons.get("view")}</div>
                    </button>
                    <button
                      className="cursor-pointer p-1 rounded-sm hover:bg-gray-200"
                      onClick={() => {
                        router.push(`/posts/${value.id}/edit`);
                      }}
                    >
                      <div className="w-6">{icons.get("edit")}</div>
                    </button>
                    <button
                      onClick={() => deleteAction(value.id)}
                      className="cursor-pointer rounded-sm p-1 hover:bg-gray-200"
                    >
                      <div className="w-6">{icons.get("delete")}</div>
                    </button>
                    <button
                      className={"cursor-pointer font-heading ml-auto p-1 text-white shadow hover:opacity-50 ".concat(
                        value.is_published ? "bg-red-500" : "bg-green-500"
                      )}
                      onClick={() =>
                        publishAction(value.id, !value.is_published)
                      }
                    >
                      {value.is_published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </>
              }
            />
          ))}
        </div>
      )}
      {props.posts.length == 0 && (
        <div className="p-8 border-gray-200 rounded-2xl shadow border mt-12">
          <div className="flex flex-col justify-center items-center py-18">
            <div className="w-16">{icons.get("file")}</div>
            <p className="font-heading my-2 font-medium text-xl">
              {"You haven't created any posts yet."}
            </p>
            <p className="font-text mb-4 text-gray-500">
              Get started by creating your first blog post.
            </p>
            <Link
              href="/newpost"
              className="flex text-white gap-2 items-center bg-(--color-light) text-lg font-semibold px-4 py-2 rounded-sm cursor-pointer hover:opacity-50"
            >
              <div className="w-8">{icons.get("plus")}</div>New Post
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
