import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminUsersPage } from "@/screens/admin/AdminUsersPage";

export const metadata = {
  title: "User Authentication | MessMate Admin",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login?setup=supabase");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin, error } = await supabase
    .from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (error || !admin) redirect("/admin/login?error=not-admin");
  return <AdminUsersPage />;
}
