import { logout } from "@/actions/auth-actions";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome, back!</p>
          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
