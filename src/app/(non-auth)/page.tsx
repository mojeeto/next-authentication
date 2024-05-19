import AuthForm from "@/components/auth-form";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    mode?: "login" | "signup";
  };
}) {
  const mode = searchParams.mode || "login";
  return <AuthForm mode={mode} />;
}
