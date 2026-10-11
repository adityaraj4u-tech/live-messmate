/**
 * MessMate — Sample data
 * Authentic GEC Banka mess menu items (illustrative examples).
 */

import type { FoodListing, Reservation, StatMetric, AvailabilityStatus } from "@/types";

export const sampleListings: FoodListing[] = [
  {
    id: "lst-001",
    dishName: "Chole Bhature + Achar + Onion",
    mealType: "breakfast",
    priceInr: 35,
    portionsTotal: 20,
    portionsRemaining: 6,
    pickupStart: "09:00",
    pickupEnd: "10:00",
    allergens: ["Gluten", "Dairy"],
    notes: "Freshly prepared. Limited portions remaining.",
    isIllustrative: true,
  },
  {
    id: "lst-002",
    dishName: "Veg Biryani + Raita",
    mealType: "dinner",
    priceInr: 50,
    portionsTotal: 25,
    portionsRemaining: 12,
    pickupStart: "21:00",
    pickupEnd: "22:00",
    allergens: ["Dairy"],
    isIllustrative: true,
  },
  {
    id: "lst-003",
    dishName: "Chicken Biryani + Raita",
    mealType: "dinner",
    priceInr: 70,
    portionsTotal: 15,
    portionsRemaining: 2,
    pickupStart: "21:00",
    pickupEnd: "22:00",
    allergens: ["Dairy"],
    notes: "Very limited — only 2 portions left.",
    isIllustrative: true,
  },
  {
    id: "lst-004",
    dishName: "Roti + Chawal + Tadka + Gulab Jamun + Bhujiya",
    mealType: "dinner",
    priceInr: 45,
    portionsTotal: 30,
    portionsRemaining: 0,
    pickupStart: "21:00",
    pickupEnd: "22:00",
    allergens: ["Gluten", "Dairy", "Nuts"],
    isIllustrative: true,
  },
  {
    id: "lst-005",
    dishName: "Aloo Paratha + Curd + Pickle",
    mealType: "breakfast",
    priceInr: 30,
    portionsTotal: 18,
    portionsRemaining: 14,
    pickupStart: "09:00",
    pickupEnd: "10:00",
    allergens: ["Gluten", "Dairy"],
    isIllustrative: true,
  },
  {
    id: "lst-006",
    dishName: "Dal Tadka + Jeera Rice + Salad",
    mealType: "lunch",
    priceInr: 40,
    portionsTotal: 22,
    portionsRemaining: 8,
    pickupStart: "13:00",
    pickupEnd: "14:00",
    isIllustrative: true,
  },
];

export const sampleReservations: Reservation[] = [
  {
    id: "RSV-GEC-1042",
    listingId: "lst-001",
    dishName: "Chole Bhature + Achar + Onion",
    customerName: "Aarav Kumar",
    rollNumber: "21CSE042",
    phone: "9876543210",
    quantity: 1,
    priceInr: 35,
    pickupStart: "09:00",
    pickupEnd: "10:00",
    status: "confirmed",
    collectionLocation: "GEC Banka Main Mess Counter",
    createdAt: "2026-10-11T08:15:00+05:30",
  },
  {
    id: "RSV-GEC-1043",
    listingId: "lst-003",
    dishName: "Chicken Biryani + Raita",
    customerName: "Priya Singh",
    phone: "9123456780",
    quantity: 2,
    priceInr: 140,
    pickupStart: "21:00",
    pickupEnd: "22:00",
    status: "confirmed",
    collectionLocation: "GEC Banka Main Mess Counter",
    createdAt: "2026-10-11T18:40:00+05:30",
  },
];

export const sampleStats: StatMetric[] = [
  { label: "Active Listings", value: 4, secondary: "Today" },
  { label: "Portions Remaining", value: 42, secondary: "Across all meals" },
  { label: "Reservations Today", value: 18, secondary: "+3 in last hour", trend: "up" },
  { label: "Upcoming Pickups", value: 2, secondary: "Next window in 45 min" },
];

export function getAvailabilityStatus(
  remaining: number,
  total: number
): AvailabilityStatus {
  if (remaining <= 0) return "sold_out";
  if (remaining <= Math.max(2, Math.floor(total * 0.15))) return "limited";
  return "available";
}
