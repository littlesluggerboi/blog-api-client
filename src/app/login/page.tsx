import LoginForm from "@/partials/login_form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";

export default async function Login() {
  const user = await verifySession();
  if (user) redirect("/");
  return (
    <div className="p-4">
      <title>A Blogs | Login</title>
      <h2 className="font-heading text-4xl text-center font-semibold">
        Sign in to your account
      </h2>
      <p className="text-center font-heading mb-8">
        Or{" "}
        <Link
          href="/signup"
          className="font-medium underline hover:no-underline"
        >
          sign up for a new account
        </Link>
      </p>
      <LoginForm />
    </div>
  );
}
