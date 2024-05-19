"use server";

import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(
  state: { email?: string; password?: string },
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: { email?: string; password?: string } = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const hashedPassword = hashUserPassword(password);
  try {
    createUser(email, hashedPassword);
  } catch (err) {
    const error = err as { code: string };
    if (err && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        email: "It seems like an account for the chosen email already exists.",
      };
    }
    throw err;
  }

  redirect("/training");
}
