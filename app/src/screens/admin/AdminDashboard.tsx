"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Listing = {
  id: string;
  dish_name: string;
  meal_type: "breakfast" | "lunch" | "dinner";
  price_inr: number;
  portions_total: number;
  portions_remaining: number;
  pickup_start: string;
  pickup_end: string;
  pickup_date: string | null;
  notes: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

const emptyForm = {
  dish_name: "",
  meal_type: "lunch" as "breakfast" | "lunch" | "dinner",
  price_inr: "40",
  portions_total: "10",
  pickup_start: "13:00",
  pickup_end: "14:00",
  pickup_date: "",
  image_url: "",
  notes: "",
};

export function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [form, setForm] = React.useState(emptyForm);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const [problem, setProblem] = React.useState("");

  const supabase = React.useMemo(() => createClient(), []);

  const loadListings = React.useCallback(async () => {
    if (!supabase) {
      setProblem("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel.");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("food_listings")
      .select("id,dish_name,meal_type,price_inr,portions_total,portions_remaining,pickup_start,pickup_end,pickup_date,notes,image_url,is_active,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      setProblem("Could not load listings. Confirm the Supabase migrations have been applied and the admin role is configured.");
    } else {
      setProblem("");
      setListings((data ?? []) as Listing[]);
    }
    setLoading(false);
  }, [supabase]);

  React.useEffect(() => { void loadListings(); }, [loadListings]);

  async function addListing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setProblem("");
    setNotice("");

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setProblem("Your session expired. Please sign in again.");
      setSaving(false);
      router.replace("/admin/login");
      return;
    }

    const total = Number(form.portions_total);
    const { error } = await supabase.from("food_listings").insert({
      dish_name: form.dish_name.trim(),
      meal_type: form.meal_type,
      price_inr: Number(form.price_inr),
      portions_total: total,
      portions_remaining: total,
      pickup_start: form.pickup_start,
      pickup_end: form.pickup_end,
      pickup_date: form.pickup_date || null,
      image_url: form.image_url.trim() || null,
      notes: form.notes.trim() || null,
      is_illustrative: false,
      is_active: true,
      college_id: "gec-banka",
      created_by: user.id,
    });

    if (error) {
      setProblem("Listing was not saved. Check the database migration and administrator permissions.");
    } else {
      setNotice("Food listing published successfully.");
      setForm(emptyForm);
      await loadListings();
    }
    setSaving(false);
  }

  async function toggleListing(item: Listing) {
    if (!supabase) return;
    setProblem("");
    const { error } = await supabase.from("food_listings").update({ is_active: !item.is_active }).eq("id", item.id);
    if (error) setProblem("Could not update this listing. Check administrator permissions.");
    else {
      setNotice(item.is_active ? "Listing hidden from the public." : "Listing is now visible to the public.");
      await loadListings();
    }
  }

  async function deleteListing(item: Listing) {
    if (!supabase || !window.confirm(`Permanently delete "${item.dish_name}"? This cannot be undone.`)) return;
    setProblem("");
    const { error } = await supabase.from("food_listings").delete().eq("id", item.id);
    if (error) setProblem("Could not delete this listing. Check administrator permissions.");
    else {
      setNotice("Listing deleted.");
      await loadListings();
    }
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const activeCount = listings.filter((item) => item.is_active).length;
  const portions = listings.filter((item) => item.is_active).reduce((sum, item) => sum + item.portions_remaining, 0);

  return (
    <main className="min-h-dvh bg-[#F5F6F1] text-[#252A26]">
      <header className="border-b border-[#244E3B]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-[#66806E]">MessMate</Link>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#173728]">Admin dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#66736A] sm:inline">{email}</span>
            <button onClick={signOut} className="rounded-xl border border-[#DDE3DC] px-4 py-2.5 text-sm font-semibold hover:bg-[#F8F7F2]">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section className="rounded-2xl border border-[#244E3B]/10 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-[#173728]">Publish a food listing</h2>
          <p className="mt-1 text-sm text-[#66736A]">Add real surplus meals for people to discover.</p>
          <form onSubmit={addListing} className="mt-5 space-y-4">
            <div>
              <label htmlFor="dish-name" className="mb-1.5 block text-sm font-semibold">Dish name *</label>
              <input id="dish-name" required maxLength={120} value={form.dish_name} onChange={(e) => setForm({ ...form, dish_name: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3.5 py-3 text-sm outline-none focus:border-[#244E3B]" placeholder="e.g. Veg thali" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="meal-type" className="mb-1.5 block text-sm font-semibold">Meal type</label>
                <select id="meal-type" value={form.meal_type} onChange={(e) => setForm({ ...form, meal_type: e.target.value as typeof form.meal_type })} className="w-full rounded-xl border border-[#DDE3DC] bg-white px-3 py-3 text-sm">
                  <option value="breakfast">Breakfast</option><option value="lunch">Lunch</option><option value="dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label htmlFor="price" className="mb-1.5 block text-sm font-semibold">Price (₹) *</label>
                <input id="price" required min="0" max="100000" type="number" value={form.price_inr} onChange={(e) => setForm({ ...form, price_inr: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3 py-3 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="portions" className="mb-1.5 block text-sm font-semibold">Portions *</label>
                <input id="portions" required min="1" max="10000" type="number" value={form.portions_total} onChange={(e) => setForm({ ...form, portions_total: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3 py-3 text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-date" className="mb-1.5 block text-sm font-semibold">Pickup date</label>
                <input id="pickup-date" type="date" value={form.pickup_date} onChange={(e) => setForm({ ...form, pickup_date: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3 py-3 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="pickup-start" className="mb-1.5 block text-sm font-semibold">Pickup starts *</label>
                <input id="pickup-start" required type="time" value={form.pickup_start} onChange={(e) => setForm({ ...form, pickup_start: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3 py-3 text-sm" />
              </div>
              <div>
                <label htmlFor="pickup-end" className="mb-1.5 block text-sm font-semibold">Pickup ends *</label>
                <input id="pickup-end" required type="time" value={form.pickup_end} onChange={(e) => setForm({ ...form, pickup_end: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3 py-3 text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="image-url" className="mb-1.5 block text-sm font-semibold">Food image URL (optional)</label>
              <input id="image-url" type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3.5 py-3 text-sm" placeholder="https://…" />
            </div>
            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold">Notes / allergens</label>
              <textarea id="notes" rows={3} maxLength={1000} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border border-[#DDE3DC] px-3.5 py-3 text-sm" placeholder="Ingredients, allergens, pickup instructions…" />
            </div>
            <button disabled={saving} type="submit" className="w-full rounded-xl bg-[#244E3B] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#173728] disabled:opacity-60">{saving ? "Publishing…" : "Publish food listing"}</button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Total listings" value={listings.length} />
            <Stat label="Active" value={activeCount} />
            <Stat label="Portions left" value={portions} />
          </div>
          <div className="rounded-2xl border border-[#244E3B]/10 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div><h2 className="text-lg font-bold text-[#173728]">Food listings</h2><p className="mt-1 text-sm text-[#66736A]">Manage published meals and availability.</p></div>
              <button onClick={() => { setLoading(true); void loadListings(); }} className="rounded-lg border border-[#DDE3DC] px-3 py-2 text-xs font-semibold">Refresh</button>
            </div>
            {notice && <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
            {problem && <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{problem}</p>}
            {loading ? <p className="py-8 text-sm text-[#66736A]">Loading listings…</p> : listings.length === 0 ? <p className="py-8 text-sm text-[#66736A]">No database listings yet. Publish your first meal using the form.</p> : (
              <div className="mt-4 space-y-3">
                {listings.map((item) => (
                  <article key={item.id} className="rounded-xl border border-[#E7EBE5] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#173728]">{item.dish_name}</h3>
                        <p className="mt-1 text-xs text-[#66736A]">{item.meal_type} · ₹{item.price_inr} · {item.portions_remaining}/{item.portions_total} portions · {item.pickup_start}–{item.pickup_end}</p>
                        {item.notes && <p className="mt-2 text-sm text-[#66736A]">{item.notes}</p>}
                      </div>
                      <span className={item.is_active ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-800" : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600"}>{item.is_active ? "Active" : "Hidden"}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button onClick={() => void toggleListing(item)} className="rounded-lg border border-[#DDE3DC] px-3 py-2 text-xs font-semibold">{item.is_active ? "Hide listing" : "Publish listing"}</button>
                      <button onClick={() => void deleteListing(item)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <footer className="px-4 pb-8 text-center text-xs text-[#788279]">MessMate Admin · Secure access · GEC Banka</footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-[#244E3B]/10 bg-white p-4 shadow-sm"><p className="text-xs font-medium text-[#66736A]">{label}</p><p className="mt-2 text-2xl font-bold text-[#173728]">{value}</p></div>;
}
