import { notFound } from "next/navigation";
import { ReservationPage } from "@/screens/ReservationPage";
import { sampleListings } from "@/lib/sample-data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = sampleListings.find((l) => l.id === id);
  if (!listing) notFound();
  return <ReservationPage listing={listing} />;
}
