"use client";
import { useActionState } from "react";
import Spinner from "./spinner";
import { signup } from "@/app/actions/signup";
import Link from "next/link";
export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form
      action={action}
      className="p-8 mt-8 shadow max-w-3xl m-auto font-text border border-gray-200 rounded-2xl"
    >
      {state?.message && (
        <p className="text-red-600 text-center font-text text-2xl">
          {state.message}
        </p>
      )}
      <label className="block" htmlFor="username">
        Username
      </label>
      {state?.errors?.username && (
        <p className="text-red-600 font-text">* {state.errors.username}</p>
      )}
      <input
        className="block p-3 border w-full border-gray-300 rounded-sm mb-6 focus:outline-(--color-prime)"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
      />
      <label className="block" htmlFor="email">
        Email Addresss
      </label>
      {state?.errors?.email && (
        <p className="text-red-600 font-text">* {state.errors.email}</p>
      )}
      <input
        className="block p-3 border w-full border-gray-300 rounded-sm mb-6 focus:outline-(--color-prime)"
        type="email"
        id="email"
        name="email"
        placeholder="Your@email.com"
        required
      />
      <label className="block" htmlFor="password">
        Password
      </label>
      {state?.errors?.password && (
        <p className="text-red-600 font-text">* {state.errors.password}</p>
      )}
      <input
        min={8}
        className="block py-2 px-4 border w-full border-gray-300 rounded-sm mb-6 focus:outline-(--color-prime)"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
      />
      <label className="block" htmlFor="password">
        Confirm Password
      </label>
      {state?.errors?.password_confirm && (
        <p className="text-red-600 font-text">
          * {state.errors.password_confirm}
        </p>
      )}
      <input
        min={8}
        className="block py-2 px-4 border w-full border-gray-300 rounded-sm mb-10 focus:outline-(--color-prime)"
        type="password"
        id="password_confirm"
        name="password_confirm"
        placeholder="Confirm Password"
        required
      />
      <button className="mb-6 text-center w-full bg-(--color-light) text-white hover:bg-(--color-sub) p-2 rounded-sm flex items-center gap-1 justify-center">
        Sign Up {pending && <Spinner height="18" width="18" />}
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link
          className="text-(--color-light) hover:text-(--color-sub)"
          href="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
