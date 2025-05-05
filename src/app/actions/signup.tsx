"use server";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  SignupFormState,
  ValidationError,
} from "../lib/definitions";
import { createSession } from "../lib/session";
export async function signup(state: SignupFormState, formData: FormData) {
  const validateFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirm: formData.get('password_confirm')
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(validateFields.data),
    });
    if (!response.ok) {
      const { errors } = await response.json();
      if (errors) {
        const emailError: ValidationError = errors.find(
          (val: ValidationError) => val.path == "email"
        );
        return {
          errors: { email: [emailError.msg] },
        };
      } else {
        return { message: `${response.status} | ${response.statusText}` };
      }
    }
    const user = await response.json();
    await createSession(user);
  } catch (err) {
    console.error(err);
    return {
      message: "Unexpected error occured",
    };
  }
  redirect("/");
}


