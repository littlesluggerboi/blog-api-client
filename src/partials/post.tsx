import { Post } from "@/app/lib/definitions";
import icons from "@/static_resources/icons";
import Link from "next/link";

export default function PostCard(props: { post: Post }) {
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
            "-"
          )}
        </span>
      </div>
      <hr />
      <Link
        className="hover:underline flex text-lg font-medium mt-4 items-center gap-2 text-(--color-light) w-fit font-heading"
        href={`/posts/${props.post.id}`}
      >
        Read More <div className="w-6">{icons.get("arrow right")}</div>
      </Link>
    </div>
  );
}
