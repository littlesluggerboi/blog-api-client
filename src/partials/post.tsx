import { Post } from "@/app/lib/definitions";

export default function PostCard(props: {
  post: Post;
  action: React.ReactNode;
}) {
  const date = new Date(props.post.created_at);
  return (
    <div className="p-8 rounded-lg border border-gray-200 shadow">
      <h3 className="font-heading font-medium text-xl">{props.post.title}</h3>
      <p className="font-text font-[350] leading-8">
        {props.post.content.substring(0, 150)}
        {props.post.content.length > 150 && "..."}
      </p>
      <div className="flex justify-between mt-4 font-heading font-medium text-sm text-gray-600">
        <span>
          {props.post.author.username
            ? props.post.author.username
            : props.post.author.email}
        </span>
        <span>
          {[date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()].join(
            "/"
          )}
        </span>
      </div>
      <hr />
      {props.action}
    </div>
  );
}
