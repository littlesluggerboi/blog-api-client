import icons from "@/static_resources/icons";
import Link from "next/link";

export default function PostCard() {
  return (
    <div className="p-8 rounded-lg border border-gray-200 shadow">
      <h3 className="font-heading font-medium text-xl">Post Title</h3>
      <p className="font-text font-[350] leading-8">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, 
      </p>
      <div className="flex justify-between mt-4 font-heading font-medium text-sm text-gray-600">
        <span>Author</span>
        <span>Date</span>
      </div>
      <hr />
      <Link className="hover:underline flex text-lg font-medium mt-4 items-center gap-2 text-(--color-light) w-fit font-heading" href="/">
        Read More <div className="w-6">{icons.get("arrow right")}</div>
      </Link>
    </div>
  );
}
