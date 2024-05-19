"use client";

import { signup } from "@/actions/auth-actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm() {
  const [state, serverAction] = useFormState(signup, {});

  return (
    <form id="auth-form" action={serverAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        {state?.email && <p>{state.email}</p>}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {state?.password && <p>{state.password}</p>}
      </p>
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
