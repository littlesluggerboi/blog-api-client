"use server"
import { redirect } from "next/navigation";
import { LoginFormSchema, LoginFormState } from "../lib/definitions";
import { createSession } from "../lib/session";

export async function login(state: LoginFormState, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(validateFields.data)
    })
    if(!response.ok){
        const {errors} = await response.json();
        if(errors){
            return {errors: errors}
        }
        return {message: `${response.status} | ${response.statusText}`}
    }
    const user = await response.json();
    await createSession(user);
  } catch (err) {
    console.error(err)
    return {
        message: "Unexpected error occured"
    }
  }
  redirect("/")
}