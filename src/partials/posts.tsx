import PostCard from "./post";

export default function Posts() {
  return (
    <div>
      <h1 className="font-heading font-semibold text-2xl mb-8">Latest Posts</h1>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}
