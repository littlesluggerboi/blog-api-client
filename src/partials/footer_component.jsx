import Link from "next/link";
import icons from "../static_resources/icons";
export default function FooterComponent() {
  return (
    <footer className="bg-(--color-prime) p-4 text-white font-heading mt-auto">
      <div className="max-w-7xl m-auto grid sm:grid-cols-2 py-4 gap-8">
        <div className="">
          <div className="flex font-semibold items-center text-3xl mb-2 gap-1">
            <div className="w-12">{icons.get("logo")}</div>
            <h2>Blogs</h2>
          </div>
          <p className="mb-4 font-text">
            A modern platform for sharing ideas, knowledge, and stories with a
            global audience.
          </p>
          <div className="flex">
          <div className="w-10 mr-2">
            <a href="/">{icons.get("twitter")}</a>
          </div>
          <div className="w-10">
            <a href="/">{icons.get("instagram")}</a>
          </div>
          </div>
        </div>
        <div className="sm:px-16 sm:ml-auto">
          <h2 className="text-2xl font-heading font-semibold mb-2">Quick Links</h2>
          <Link className="block font-text text-lg mb-1 hover:underline hover:text-(--color-light)" href="/">
            Home
          </Link>
          <Link className="block font-text text-lg mb-1 hover:underline hover:text-(--color-light)" href="/about">
            About
          </Link>
          <Link className="block font-text text-lg mb-1 hover:underline hover:text-(--color-light)" href="/login">
            Login
          </Link>
          <Link className="block font-text text-lg mb-1 hover:underline hover:text-(--color-light)" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <hr />
      <div className="flex justify-between m-auto py-8 max-w-7xl flex-wrap font-text font-light gap-8">
        <p>&copy; 2025 A Blogs. All rights reserved</p>
        <div className="flex gap-4 underline">
            <span>Terms of Services</span>
            <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
