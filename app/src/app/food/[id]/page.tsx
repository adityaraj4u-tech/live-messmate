import { notFound } from "next/navigation";
import { FoodDetailPage } from "@/screens/FoodDetailPage";
import { sampleListings } from "@/lib/sample-data";

export function generateStaticParams() {
  return sampleListings.map((l) => ({ id: l.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = sampleListings.find((l) => l.id === id);
  if (!listing) notFound();
  return <FoodDetailPage listing={listing} />;
}
