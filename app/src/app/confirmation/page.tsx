import { ConfirmationPage } from "@/screens/ConfirmationPage";
import type { Reservation } from "@/types";

export const metadata = {
  title: "Reservation Confirmed",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;

  const reservation: Reservation = {
    id: sp.id ?? "RSV-GEC-0000",
    listingId: "",
    dishName: sp.dish ?? "Surplus meal",
    customerName: sp.name ?? "Guest",
    phone: sp.phone ?? "",
    quantity: Number(sp.qty) || 1,
    priceInr: Number(sp.price) || 0,
    pickupStart: sp.start ?? "12:00",
    pickupEnd: sp.end ?? "13:00",
    status: "confirmed",
    collectionLocation: "GEC Banka Main Mess Counter",
    createdAt: new Date().toISOString(),
  };

  return <ConfirmationPage reservation={reservation} />;
}
