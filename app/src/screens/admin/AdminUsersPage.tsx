"use client";

import * as React from "react";
import Link from "next/link";

type AuthUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  banned_until: string | null;
};

export function AdminUsersPage() {
  const [users, setUsers] = React.useState<AuthUser[]>([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [problem, setProblem] = React.useState("");

  const loadUsers = React.useCallback(async () => {
    setLoading(true);
    setProblem("");
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load users.");
      setUsers(result.users ?? []);
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void loadUsers(); }, [loadUsers]);

  async function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setProblem("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not create user.");
      setMessage(`Created account for ${result.user.email}.`);
      setEmail("");
      setPassword("");
      await loadUsers();
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not create user.");
    } finally {
      setSaving(false);
    }
  }

  async function setUserStatus(user: AuthUser, action: "disable" | "enable") {
    setProblem("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, action }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update user.");
      setMessage(action === "disable" ? `Disabled ${user.email}.` : `Enabled ${user.email}.`);
      await loadUsers();
    } catch (error) {
      setProblem(error instanceof Error ? error.message : "Could not update user.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#F5F6F1] text-[#252A26]">
      <header className="border-b border-[#244E3B]/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div><Link href="/admin" className="text-sm font-semibold text-[#244E3B] hover:underline">← Admin dashboard</Link><h1 className="mt-2 text-2xl font-bold text-[#173728]">User authentication</h1><p className="mt-1 text-sm text-[#66736A]">Manage accounts stored in Supabase Authentication.</p></div>
          <button onClick={() => void loadUsers()} className="rounded-xl border border-[#DDE3DC] bg-white px-4 py-2.5 text-sm font-semibold">Refresh</button>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="h-fit rounded-2xl border border-[#244E3B]/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#173728]">Create user account</h2>
          <p className="mt-1 text-sm leading-6 text-[#66736A]">Creates an email/password account in Supabase Auth and marks the email as confirmed. Share credentials securely and ask the user to change their password.</p>
          <form onSubmit={createUser} className="mt-5 space-y-4">
            <div><label htmlFor="user-email" className="mb-1.5 block text-sm font-semibold">Email address</label><input id="user-email" required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border border-[#DDE3DC] px-3.5 py-3 text-sm outline-none focus:border-[#244E3B]" placeholder="student@example.com" /></div>
            <div><label htmlFor="user-password" className="mb-1.5 block text-sm font-semibold">Temporary password</label><input id="user-password" required minLength={10} type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-xl border border-[#DDE3DC] px-3.5 py-3 text-sm outline-none focus:border-[#244E3B]" placeholder="At least 10 characters" /></div>
            <button disabled={saving} type="submit" className="w-full rounded-xl bg-[#244E3B] px-4 py-3 font-bold text-white disabled:opacity-60">{saving ? "Creating…" : "Create account"}</button>
          </form>
          <p className="mt-4 text-xs leading-5 text-[#788279]">Security: the service-role key is used only on the server and is never sent to the browser.</p>
        </section>
        <section className="rounded-2xl border border-[#244E3B]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-[#173728]">Registered users</h2><p className="mt-1 text-sm text-[#66736A]">First 100 Supabase Auth accounts.</p></div><span className="rounded-full bg-[#F0F4EF] px-3 py-1 text-sm font-semibold">{users.length}</span></div>
          {message && <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">{message}</p>}
          {problem && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{problem}</p>}
          {loading ? <p className="py-8 text-sm text-[#66736A]">Loading accounts…</p> : users.length === 0 ? <p className="py-8 text-sm text-[#66736A]">No users found yet.</p> : <div className="mt-4 space-y-3">{users.map(user => { const disabled = Boolean(user.banned_until && new Date(user.banned_until).getTime() > Date.now()); return <article key={user.id} className="rounded-xl border border-[#E7EBE5] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="break-all font-semibold text-[#173728]">{user.email || "No email"}</p><p className="mt-1 text-xs text-[#66736A]">Joined {new Date(user.created_at).toLocaleDateString()}</p><p className="mt-1 text-xs text-[#66736A]">{user.email_confirmed_at ? "Email confirmed" : "Email not confirmed"} · {user.last_sign_in_at ? `Last sign-in ${new Date(user.last_sign_in_at).toLocaleDateString()}` : "Never signed in"}</p></div><span className={disabled ? "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700" : "rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-800"}>{disabled ? "Disabled" : "Active"}</span></div><button onClick={() => void setUserStatus(user, disabled ? "enable" : "disable")} className="mt-3 rounded-lg border border-[#DDE3DC] px-3 py-2 text-xs font-semibold">{disabled ? "Re-enable account" : "Disable account"}</button></article>; })}</div>}
        </section>
      </div>
    </main>
  );
}
