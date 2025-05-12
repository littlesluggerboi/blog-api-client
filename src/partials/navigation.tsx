"use client";
import Link from "next/link";
import icons from "../static_resources/icons";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { User } from "@/app/lib/definitions";
import { logout } from "@/app/actions/logout";

export default function Navigation(props: { user: User | null }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  return (
    <header className="bg-(--color-prime) p-4 text-white font-heading">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/" className="flex font-semibold items-center text-4xl">
          <div className="w-16">{icons.get("logo")}</div>
          <h1>Blogs</h1>
        </Link>
        <div className="hidden gap-4 text-xl items-center font-medium md:flex">
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
          {!props.user && (
            <>
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
            </>
          )}
          {props.user && (
            <>
              <Link
                href="/myposts"
                className={
                  "hover:text-(--color-light) " +
                  (path.startsWith("/myposts") ? "text-(--color-light)" : "")
                }
              >
                My Posts
              </Link>
              <Link
                className="bg-(--color-light) py-2 px-4 rounded-sm hover:opacity-50"
                href="/newpost"
              >
                Write Post
              </Link>
              <div className="font-text max-w-48 relative" onMouseOver={()=> setProfile(true)} onMouseLeave={()=> setProfile(false)}>
                <div className="flex" >
                  <div className="w-8 h-8 bg-white text-(--color-sub) flex justify-center items-center rounded-4xl">
                    A
                  </div>
                  <span>&#8964;</span>
                </div>
                {profile && (
                  <div className="rounded-sm absolute bg-(--color-sub) right-0 py-4 px-1 font-heading text-sm w-48 z-10 shadw">
                    <Link
                      className="block py-1 px-3 hover:bg-white hover:text-black rounded-sm "
                      href="/myposts"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="py-1 px-3 cursor-pointer hover:bg-white w-full hover:text-black rounded-sm text-start"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenu(!menu)}
            className="w-12 cursor-pointer hover:opacity-80"
          >
            {menu ? icons.get("close white") : icons.get("menu")}
          </button>
        </div>
      </nav>
      {menu && (
        <div className="md:hidden flex flex-col gap-4 text-xl font-medium mt-2">
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
          {!props.user && (
            <>
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
            </>
          )}
          {props.user && (
            <>
              <Link
                className={
                  "hover:text-(--color-light) py-2 px-4 rounded-sm hover:bg-gray-200 " +
                  (path.startsWith("/myposts")
                    ? "text-(--color-light) bg-gray-200"
                    : "")
                }
                href="/myposts"
              >
                My Posts
              </Link>
              <Link
                className="bg-(--color-light) py-2 px-4 rounded-sm hover:opacity-50"
                href="/newpost"
              >
                Write Post
              </Link>
              <button
                onClick={() => logout()}
                className="text-start py-2 px-4 rounded-sm hover:bg-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
