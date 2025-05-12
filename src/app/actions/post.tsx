"use server";

import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import {
  NewPostFormSchema,
  NewPostFormState,
  UpdatePostFormState,
  UpdatePostSchema,
} from "../lib/definitions";

export async function postPost(state: NewPostFormState, formData: FormData) {
  const user = await verifySession();
  if (!user) {
    redirect("/login");
  }
  const validateFields = NewPostFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    is_published: formData.get("is_published"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Invalid field values",
    };
  }
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${user.token}`,
      },
      body: new URLSearchParams(validateFields.data),
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return { message: "Unexpected problem encountered..." };
    }
    const { message } = await res.json();
    console.log(message);
  } catch (error) {
    console.error(error);
    return { message: "Unexpected problem encountered..." };
  }
  redirect("/myposts");
}

export async function updatePost(
  state: UpdatePostFormState,
  formData: FormData
) {
  const user = await verifySession();
  if (!user) {
    redirect("/login");
  }
  const validateFields = UpdatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    id: formData.get("id"),
  });
  if (!validateFields.success) {
    console.log(validateFields.error.flatten().fieldErrors)
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Invalid field values",
    };
  }
  const { id, ...payload } = validateFields.data;
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: new URLSearchParams(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return { message: "Unexpected problem encountered..." };
    }
    const { message } = await res.json();
    console.log(message);
  } catch (error) {
    console.error(error);
    return { message: "Unexpected problem encountered..." };
  }
  redirect(`/posts/${id}`);
}
