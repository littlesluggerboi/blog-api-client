import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { Post, User } from "./definitions";

export const verifySession = async (): Promise<User | null> => {
  const cookie = (await cookies()).get("session")?.value;
  const user = await decrypt(cookie);
  if (!user) {
    return null;
  }
  const properties = Object.getOwnPropertyNames(user);
  if (
    properties.includes("username") &&
    typeof user.username == "string" &&
    properties.includes("email") &&
    typeof user.email == "string" &&
    properties.includes("role") &&
    typeof user.role == "string" &&
    properties.includes("token") &&
    typeof user.token == "string"
  ) {
    return {
      email: user.email,
      role: user.role,
      username: user.username || null,
      token: user.token,
    };
  }
  throw new Error("Break the app; Invalid session");
};

export const getPosts = async (): Promise<Post[]> => {
  const url = `${process.env.BACKEND_URL}/posts?published=${true}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) {
    throw new Error(`${res.status} | ${res.statusText}`);
  }
  const { posts } = await res.json();
  return posts;
};
