import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/screens/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | MessMate",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const supabase = await createClient();
  if (!supabase) redirect("/admin/login?setup=supabase");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: adminRole, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !adminRole) redirect("/admin/login?error=not-admin");

  return <AdminDashboard email={user.email ?? "Administrator"} />;
}
