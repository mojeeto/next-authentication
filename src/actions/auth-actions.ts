"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { UserType } from "@/lib/db";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { sign } from "crypto";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { redirect } from "next/navigation";

export async function signup(
  _state: { email?: string; password?: string },
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
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId.toString());
    redirect("/training");
  } catch (err) {
    const error = err as { code: string };
    if (err && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        email: "It seems like an account for the chosen email already exists.",
      };
    }
    throw err;
  }
}

export async function login(
  _state: { email?: string; password?: string },
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

  // check user is exists
  const user = getUserByEmail(email);
  if (!user)
    return {
      email: "Email is not exists!",
    };
  // check user password
  const verifiedPassword = verifyPassword(user.password, password);
  if (!verifiedPassword)
    return {
      password: "Password is not correct!",
    };
  // create session
  await createAuthSession(user.id.toString());
  redirect("/training");
}

export async function auth(
  mode: "login" | "signup",
  prevState: { email?: string; password?: string },
  formData: FormData,
) {
  if (mode === "login") {
    return await login(prevState, formData);
  }
  return await signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  return redirect("/");
}
