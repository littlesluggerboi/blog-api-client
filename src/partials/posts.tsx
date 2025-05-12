import { Post } from "@/app/lib/definitions";
import PostCard from "./post";
import Link from "next/link";
import icons from "@/static_resources/icons";

export default function Posts(props: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-heading font-semibold text-2xl mb-8">Latest Posts</h1>
      {props.posts.length > 0 && (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {props.posts.map((value) => (
            <PostCard key={value.id} post={value} action={<Link
              className="hover:underline flex text-lg font-medium mt-4 items-center gap-2 text-(--color-light) w-fit font-heading"
              href={`/posts/${value.id}`}
            >
              Read More <div className="w-6">{icons.get("arrow right")}</div>
            </Link>}/>
          ))}
        </div>
      )}
      {props.posts.length == 0 && <div>
        <p className="font-text text-gray-600">No posts available</p>
        </div>}
    </div>
  );
}
