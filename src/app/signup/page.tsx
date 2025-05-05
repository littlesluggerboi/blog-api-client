import Link from "next/link";
import SignUpForm from "../../partials/signup_form"
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await verifySession();
  if(user) redirect('/')
  return (
    <div className="p-4">
      <title>A Blogs | Sign Up</title>
      <h2 className="font-heading text-4xl text-center font-semibold">
        Sign up with us
      </h2>
      <p className="text-center font-heading">
        Or{" "}
        <Link
          href="/login"
          className="font-medium underline hover:no-underline"
        >
          sign in to your existing account
        </Link>
      </p>
      <SignUpForm/>
    </div>
  );
}
