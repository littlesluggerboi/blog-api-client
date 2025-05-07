import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { User } from "./definitions";

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
