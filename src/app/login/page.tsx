import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A Blogs | Login",
};

export default function Login() {
  return (
    <div className="p-4">
      <h2 className="font-heading text-4xl text-center font-semibold">Sign in to your account</h2>
      <p className="text-center font-heading mb-8">
        Or <Link href="signup" className="font-medium underline hover:no-underline">sign up for a new account</Link>
      </p>
      <form action="" className="p-8 shadow max-w-3xl m-auto font-text">
        <label className="block" htmlFor="email">Email Addresss</label>
        <input className="block p-3 border w-full border-gray-300 rounded-sm mb-6 focus:outline-(--color-prime)" type="email" id="email" name="email" placeholder="your@email.com" required />
        <label className="block" htmlFor="password">Password</label>
        <input className="block py-2 px-4 border w-full border-gray-300 rounded-sm mb-6 focus:outline-(--color-prime)" type="password" id="password" name="password" placeholder="password" required />
        <button className="mb-6 text-center w-full bg-(--color-light) text-white hover:bg-(--color-sub) p-2 rounded-sm">Login</button>
        <p className="text-center">{"Don't have an account? "}<Link className="text-(--color-light) hover:text-(--color-sub)" href="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}
