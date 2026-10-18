import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function authorizeAdmin() {
  const sessionClient = await createServerClient();
  if (!sessionClient) return { error: "Supabase is not configured.", status: 503 as const };
  const { data: { user }, error: authError } = await sessionClient.auth.getUser();
  if (authError || !user) return { error: "Sign in required.", status: 401 as const };

  const { data: admin, error } = await sessionClient
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error || !admin) return { error: "Administrator access required.", status: 403 as const };

  const service = createServiceClient();
  if (!service) return { error: "Missing server-side SUPABASE_SERVICE_ROLE_KEY environment variable.", status: 503 as const };
  return { service };
}

export async function GET() {
  const access = await authorizeAdmin();
  if ("error" in access) return NextResponse.json({ error: access.error }, { status: access.status });

  const { data, error } = await access.service.auth.admin.listUsers({ page: 1, perPage: 100 });
  if (error) return NextResponse.json({ error: "Could not load users from Supabase Auth." }, { status: 502 });
  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email ?? "",
    created_at: user.created_at,
    last_sign_in_at: user.last_sign_in_at ?? null,
    email_confirmed_at: user.email_confirmed_at ?? null,
    banned_until: user.banned_until ?? null,
  }));
  return NextResponse.json({ users, nextPage: data.nextPage });
}

export async function POST(request: Request) {
  const access = await authorizeAdmin();
  if ("error" in access) return NextResponse.json({ error: access.error }, { status: access.status });

  let body: { email?: string; password?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length < 10) {
    return NextResponse.json({ error: "Enter a valid email and a password of at least 10 characters." }, { status: 400 });
  }

  const { data, error } = await access.service.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ user: { id: data.user.id, email: data.user.email, created_at: data.user.created_at } }, { status: 201 });
}

export async function PATCH(request: Request) {
  const access = await authorizeAdmin();
  if ("error" in access) return NextResponse.json({ error: access.error }, { status: access.status });

  let body: { userId?: string; action?: "disable" | "enable" };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  if (!body.userId || !["disable", "enable"].includes(body.action ?? "")) {
    return NextResponse.json({ error: "Provide a user ID and a valid action." }, { status: 400 });
  }

  const { data: { user: currentUser } } = await (await createServerClient())!.auth.getUser();
  if (currentUser?.id === body.userId && body.action === "disable") {
    return NextResponse.json({ error: "You cannot disable your own signed-in account." }, { status: 400 });
  }

  const { error } = await access.service.auth.admin.updateUserById(body.userId, {
    ban_duration: body.action === "disable" ? "876000h" : "none",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
