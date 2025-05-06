import { Metadata } from "next";
import { verifySession } from "./lib/dal";
import Link from "next/link";
import Posts from "@/partials/posts";

export const metadata: Metadata = {
  title: "A Blogs | Home",
};
export default async function Home() {
  const user = await verifySession();
  return (
    <>
      <section className="bg-gray-200 py-12">
        <div className="p-4 max-w-7xl m-auto">
          <h1 className="max-w-2xl font-heading font-bold text-5xl mb-2">
            Share Your Ideas With The World
          </h1>
          <p className="font-text text-lg max-w-2xl mb-2">
            Join our community of writers and readers passionate about
            technology, design, and creativity.
          </p>
          <div className="bg-(--color-light) max-w-2xl p-6 rounded-lg">
            <p className="font-text text-white mb-4">
              Join our community to create your own posts and engage with
              others.
            </p>
            <div className="flex gap-2">
              {user ? (
                <>
                  <Link
                    className="px-4 py-2 font-heading font-medium rounded-sm text-white hover:border-gray-400  border  hover:bg-gray-400"
                    href="/myposts"
                  >
                    My Posts
                  </Link>
                  <Link
                    className="px-4 py-2 font-medium font-heading bg-white hover:bg-gray-400 rounded-sm hover:text-white"
                    href="/newpost"
                  >
                    Write Post
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="px-4 py-2 font-heading font-medium rounded-sm text-white hover:border-gray-400  border  hover:bg-gray-400"
                    href="/login"
                  >
                    Log in
                  </Link>
                  <Link
                    className="px-4 py-2 font-heading font-medium bg-white hover:bg-gray-400 rounded-sm hover:text-white"
                    href="/signup"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 mx-4">
        <div className="m-auto max-w-7xl ">
          <Posts/>
        </div>
      </section>
      <section className="py-16 text-center bg-gray-200">
        <h2 className="text-3xl font-heading font-semibold mb-2">
          Ready to start your blogging journey?
        </h2>
        <p className="max-w-xl mx-auto font-text text-gray-500 mb-8">
          Join our community of writers and share your knowledge, ideas, and
          stories with readers around the world.
        </p>
        <div>
          <Link
            className="p-4 shadow rounded-sm font-heading font-medium mr-8 bg-(--color-light) text-white hover:bg-(--color-sub)"
            href="/newpost"
          >
            Start Writing
          </Link>
          <Link
            className="p-4 shadow rounded-sm font-heading font-medium bg-gray-50 hover:bg-gray-400"
            href="/about"
          >
            Learn More
          </Link>
        </div>
      </section>
    </>
  );
}
