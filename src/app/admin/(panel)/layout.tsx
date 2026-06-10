import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/admin-auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value ?? "";
  const secret = process.env.ADMIN_SECRET ?? "";

  if (!token || !verifySession(token, secret)) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
