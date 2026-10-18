"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured. Add the project URL and publishable key to Vercel environment variables.");
      setLoading(false);
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setError("Sign-in failed. Check your email and password.");
      setLoading(false);
      return;
    }

    const { data: role, error: roleError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (roleError || !role) {
      await supabase.auth.signOut();
      setError("This account does not have MessMate administrator access.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-dvh bg-[#F8F7F2] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/" className="text-sm font-semibold text-[#244E3B] hover:underline">← Back to MessMate</Link>
        <section className="mt-6 rounded-3xl border border-[#244E3B]/10 bg-white p-7 shadow-xl sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#66806E]">MessMate · Secure access</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#173728]">Admin sign in</h1>
            <p className="mt-2 text-sm leading-6 text-[#66736A]">Sign in with an administrator account assigned in Supabase.</p>
          </div>
          {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-semibold text-[#252A26]">Email address</label>
              <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-[#DDE3DC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#244E3B] focus:ring-2 focus:ring-[#244E3B]/15" placeholder="admin@example.com" />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-[#252A26]">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-[#DDE3DC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#244E3B] focus:ring-2 focus:ring-[#244E3B]/15" placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#244E3B] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#173728] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Verifying access…" : "Sign in securely"}
            </button>
          </form>
          <p className="mt-6 text-xs leading-5 text-[#788279]">Admin access is granted separately. Creating a normal user account does not grant administrator privileges.</p>
        </section>
      </div>
    </main>
  );
}
