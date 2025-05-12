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

export const CommentFormSchema = z.object({
  post_id: z.custom((data) => {
    const num = parseInt(data);
    return !isNaN(num) && data > 0;
  }),
  comment: z.string().min(1, { message: "Comment cannot be empty." }).trim(),
});

export const UpdateCommentSchema = z.object({
  comment: z.string().min(1, { message: "Comment cannot be empty." }).trim(),
  id: z.custom((data) => {
    const num = parseInt(data);
    return !isNaN(num) && data > 0;
  }),
  post_id: z.custom((data) => {
    const num = parseInt(data);
    return !isNaN(num) && data > 0;
  }),
});

export const NewPostFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title must not be empty." }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content field cannot be empty." }),
  is_published: z.preprocess((value) => {
    if (value == "on") {
      return "true";
    }
    return "false";
  }, z.string()),
});

export const UpdatePostSchema = z.object({
  title: z.string().trim().min(1, { message: "Title must not be empty." }),
  content: z
    .string()
    .trim()
    .min(1, { message: "Content field cannot be empty." }),
  id: z.custom((data) => {
    const num = parseInt(data);
    return !isNaN(num) && data > 0;
  }),
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

export type CommentFormState =
  | {
      errors?: {
        comment?: string[];
        post_id?: string[];
      };
      message?: string;
    }
  | undefined;

export type UpdateCommentFormState =
  | {
      errors?: {
        comment?: string[];
        id?: string[];
        post_id?: string[];
      };
      message?: string;
    }
  | undefined;

export type NewPostFormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        is_published?: string[];
      };
      message?: string;
    }
  | undefined;

export type UpdatePostFormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        id?: string[];
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
export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    username: string | null;
    email: string;
  };
};

export interface PostWithComments extends Post {
  comments: Comment[];
}
