/**
 * MessMate — Food listings data access
 *
 * Strategy:
 * 1. If Supabase is configured → fetch live rows from `food_listings`
 * 2. Otherwise → return sample/illustrative data (current behaviour)
 *
 * Never invent production statistics. Overbooking protection will be
 * enforced in a later phase with atomic RPCs / RLS.
 */

import type { FoodListing, MealType } from "@/types";
import { sampleListings } from "@/lib/sample-data";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

/** Map a DB row to the app FoodListing type */
function mapRow(row: Record<string, unknown>): FoodListing {
  return {
    id: String(row.id),
    dishName: String(row.dish_name ?? row.dishName ?? ""),
    mealType: (row.meal_type ?? row.mealType ?? "lunch") as MealType,
    priceInr: Number(row.price_inr ?? row.priceInr ?? 0),
    portionsTotal: Number(row.portions_total ?? row.portionsTotal ?? 0),
    portionsRemaining: Number(
      row.portions_remaining ?? row.portionsRemaining ?? 0
    ),
    pickupStart: String(row.pickup_start ?? row.pickupStart ?? ""),
    pickupEnd: String(row.pickup_end ?? row.pickupEnd ?? ""),
    pickupDate: row.pickup_date
      ? String(row.pickup_date)
      : row.pickupDate
        ? String(row.pickupDate)
        : undefined,
    allergens: Array.isArray(row.allergens)
      ? (row.allergens as string[])
      : undefined,
    notes: row.notes ? String(row.notes) : undefined,
    imageUrl: row.image_url
      ? String(row.image_url)
      : row.imageUrl
        ? String(row.imageUrl)
        : undefined,
    isIllustrative: Boolean(row.is_illustrative ?? row.isIllustrative ?? false),
  };
}

/**
 * Fetch active food listings.
 * Returns sample data when Supabase is not configured or the query fails.
 */
export async function getListings(): Promise<{
  listings: FoodListing[];
  source: "supabase" | "sample";
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { listings: sampleListings, source: "sample" };
  }

  const supabase = createClient();
  if (!supabase) {
    return { listings: sampleListings, source: "sample" };
  }

  try {
    const { data, error } = await supabase
      .from("food_listings")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[listings] Supabase error, falling back to sample:", error.message);
      return {
        listings: sampleListings,
        source: "sample",
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      // Table exists but empty — still prefer sample for demo UX
      return { listings: sampleListings, source: "sample" };
    }

    return {
      listings: data.map(mapRow),
      source: "supabase",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.warn("[listings] fetch failed, falling back to sample:", message);
    return { listings: sampleListings, source: "sample", error: message };
  }
}

/** Fetch a single listing by id */
export async function getListingById(
  id: string
): Promise<FoodListing | null> {
  // Always check sample first for illustrative ids
  const sample = sampleListings.find((l) => l.id === id);
  if (sample) return sample;

  if (!isSupabaseConfigured()) return null;

  const supabase = createClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("food_listings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return mapRow(data);
  } catch {
    return null;
  }
}
