/**
 * MessMate — Shared domain types
 */

export type MealType = "breakfast" | "lunch" | "dinner";

export type AvailabilityStatus =
  | "available"
  | "limited"
  | "sold_out"
  | "pickup_soon";

export type ReservationStatus =
  | "confirmed"
  | "collected"
  | "expired"
  | "cancelled";

export interface FoodListing {
  id: string;
  dishName: string;
  mealType: MealType;
  priceInr: number;
  portionsTotal: number;
  portionsRemaining: number;
  pickupStart: string;
  pickupEnd: string;
  pickupDate?: string;
  allergens?: string[];
  notes?: string;
  imageUrl?: string;
  isIllustrative?: boolean;
}

export interface Reservation {
  id: string;
  listingId: string;
  dishName: string;
  customerName: string;
  rollNumber?: string;
  phone: string;
  quantity: number;
  priceInr: number;
  pickupStart: string;
  pickupEnd: string;
  pickupDate?: string;
  status: ReservationStatus;
  collectionLocation?: string;
  createdAt: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  secondary?: string;
  trend?: "up" | "down" | "neutral";
}
