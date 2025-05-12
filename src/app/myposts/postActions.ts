"use server";
import { verifySession } from "../lib/dal";

export async function deletePost(id: number) {
  const user = await verifySession();
  if (!user) throw new Error("Unauthorized");
  const response = await fetch(`${process.env.BACKEND_URL}/posts/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  if (!response.ok) throw new Error("Unexpected Error");
  const { message } = await response.json();
  console.log(message);
}

export async function publishPost(id: number, publish: boolean) {
  const user = await verifySession();
  if (!user) throw new Error("Unauthorized");
  let publish_value = "false";
  if(publish) publish_value = "true";
  const response = await fetch(`${process.env.BACKEND_URL}/posts/${id}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: new URLSearchParams({ is_published: publish_value }),
  });
  if (!response.ok) throw new Error("Unexpected Error");
  const { message } = await response.json();
  console.log(message);
}
