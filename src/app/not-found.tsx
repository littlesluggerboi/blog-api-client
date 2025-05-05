import Link from "next/link";
import icons from "./static_resources/icons";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col mx-4 my-[clamp(2rem,20vh,15rem)]">
      <h1 className="text-5xl font-semibold font-text mb-2 text-center">Page Not Found</h1>
      <div className="flex font-heading font-semibold items-center text-xl opacity-70">
        <div className="w-8">{icons.get("logo black")}</div>
        Blogs
      </div>
      <Link className="bg-(--color-light) hover:opacity-90 text-white font-heading font-semibold px-4 py-2 mt-2 rounded-sm" href="/">Return Home</Link>
    </div>
  );
}
