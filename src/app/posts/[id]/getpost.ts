import "server-only";
import { PostWithComments } from "@/app/lib/definitions";
import { verifySession } from "@/app/lib/dal";
import { notFound } from "next/navigation";

export const fetchPost = async (
  id: string | undefined
): Promise<PostWithComments> => {
  const user = await verifySession();
  let header: { Authorization: string } | undefined = undefined;
  if (user) {
    header = { Authorization: `Bearer ${user.token}` };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/posts/${id}?comments=${true}`,
    {
      signal: AbortSignal.timeout(3000),
      headers: header,
    }
  );
  if (res.status == 404) {
    notFound();
  }
  const { post } = await res.json();
  return post;
};
