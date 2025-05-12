"use server";
import { redirect } from "next/navigation";
import {
  CommentFormSchema,
  CommentFormState,
  UpdateCommentFormState,
  UpdateCommentSchema,
} from "../lib/definitions";
import { verifySession } from "../lib/dal";
export async function comment(state: CommentFormState, formData: FormData) {
  const validateFields = CommentFormSchema.safeParse({
    post_id: formData.get("post_id"),
    comment: formData.get("comment"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Invalid comment",
    };
  }
  const payload = {
    post_id: `${validateFields.data.post_id}`,
    comment: `${validateFields.data.comment}`,
  };
  try {
    const user = await verifySession();
    if (!user) throw new Error("Login to comment.");
    const res = await fetch(`${process.env.BACKEND_URL}/comments`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: new URLSearchParams(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return {
        message: "Unexpected problem encountered...",
      };
    }
  } catch (error) {
    console.error(error);
    return { message: "Unexpected problem encountered..." };
  }
  redirect(`/posts/${validateFields.data.post_id}`);
}

export async function deleteComment(id: number) {
  const user = await verifySession();
  if (!user) throw new Error("Invalid Action");
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/comments/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!res.ok) throw new Error("Unexpected Error");
    const { message } = await res.json();
    console.log(message);
  } catch (error) {
    console.log(error);
    throw new Error("Unexpected Error");
  }
}

export async function updateComment(
  state: UpdateCommentFormState,
  formData: FormData
) {
  const validateFields = UpdateCommentSchema.safeParse({
    comment: formData.get("comment"),
    id: formData.get("id"),
    post_id: formData.get("post_id"),
  });

  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Invalid comment",
    };
  }
  try {
    const user = await verifySession();
    if (!user) throw new Error("Login to comment.");
    const res = await fetch(
      `${process.env.BACKEND_URL}/comments/${validateFields.data.id}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: new URLSearchParams({ comment: validateFields.data.comment }),
      }
    );
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return {
        message: "Unexpected problem encountered...",
      };
    }
  } catch (error) {
    console.error(error);
    return { message: "Unexpected problem encountered..." };
  }
  redirect(`/posts/${validateFields.data.post_id}`)
}
