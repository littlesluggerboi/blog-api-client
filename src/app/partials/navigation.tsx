"use client";
import Link from "next/link";
import icons from "../static_resources/icons";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  return (
    <header className="bg-(--color-prime) p-4 text-white font-heading">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/" className="flex font-semibold items-center text-4xl">
          <div className="w-16">{icons.get("logo")}</div>
          <h1>Blogs</h1>
        </Link>
        <div className="hidden gap-4 text-xl items-center font-medium sm:flex">
          <Link
            className={
              "hover:text-(--color-light) " +
              (path == "/" ? "text-(--color-light)" : "")
            }
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              "hover:text-(--color-light) " +
              (path.startsWith("/about") ? "text-(--color-light)" : "")
            }
            href="/about"
          >
            About
          </Link>
          <Link
            className={
              "hover:text-(--color-light) " +
              (path.startsWith("/login") ? "text-(--color-light)" : "")
            }
            href="/login"
          >
            Login
          </Link>
          <Link
            className="bg-(--color-light) py-2 px-4 rounded-sm hover:opacity-50"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
        <div className="sm:hidden">
          <button
            onClick={() => setMenu(!menu)}
            className="w-12 cursor-pointer hover:opacity-80"
          >
            {menu ? icons.get("close white") : icons.get("menu")}
          </button>
        </div>
      </nav>
      {menu && (
        <div className="sm:hidden flex flex-col gap-4 text-xl font-medium mt-2">
          <hr />
          <Link
            className={
              "hover:text-(--color-light) py-2 px-4 rounded-sm hover:bg-gray-200 " +
              (path == "/" ? "text-(--color-light) bg-gray-200" : "")
            }
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              "hover:text-(--color-light) py-2 px-4 rounded-sm hover:bg-gray-200 " +
              (path.startsWith("/about")
                ? "text-(--color-light) bg-gray-200"
                : "")
            }
            href="/about"
          >
            About
          </Link>
          <Link
            className={
              "hover:text-(--color-light) py-2 px-4 rounded-sm hover:bg-gray-200 " +
              (path.startsWith("/login")
                ? "text-(--color-light) bg-gray-200"
                : "")
            }
            href="/login"
          >
            Login
          </Link>
          <Link
            className="bg-(--color-light) py-2 px-4 rounded-sm hover:opacity-50"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
