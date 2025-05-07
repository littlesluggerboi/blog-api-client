import { z } from "zod";
export type User = {
  email: string;
  role: string;
  username: string | null;
  token: string;
};

export const SignupFormSchema = z
  .object({
    username: z.string().trim(),
    email: z.string().email({ message: "Invalid email value" }).trim(),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 character long." })
      .trim(),
    password_confirm: z
      .string()
      .min(8, { message: "Password must be atleast 8 character long." }),
  })
  .superRefine(({ password, password_confirm }, ctx) => {
    if (password != password_confirm) {
      ctx.addIssue({
        code: "custom",
        message: "Does not match the password",
        path: ["password_confirm"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email value" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 character long." })
    .trim(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        password_confirm?: string[];
      };
      message?: string;
    }
  | undefined;

export type ValidationError = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

export type SessionPayload = {
  email: string;
  role: string;
  token: string;
  username: string | null;
  expiresAt: Date;
};

export type Post = {
  id: number;
  author_id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
  last_edited: string;
  author: {
    username: string | null;
    email: string;
  };
};
