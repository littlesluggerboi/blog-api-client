import { Post } from "@/app/lib/definitions";
import PostCard from "./post";

export default function Posts(props: { posts: Post[] }) {
  return (
    <div>
      <h1 className="font-heading font-semibold text-2xl mb-8">Latest Posts</h1>
      {props.posts.length > 0 && (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {props.posts.map((value) => (
            <PostCard key={value.id} post={value} />
          ))}
        </div>
      )}
      {props.posts.length == 0 && <div>
        </div>}
    </div>
  );
}
