"use server";

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
}
