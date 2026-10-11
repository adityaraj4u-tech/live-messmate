/**
 * MessMate — Full Homepage
 * Exact section order from the design blueprint.
 */

import { Hero } from "./Hero";
import { TrustStrip } from "./TrustStrip";
import { HowItWorks } from "./HowItWorks";
import { DiscoverPreview } from "./DiscoverPreview";
import { Mission } from "./Mission";
import { ForTheMess } from "./ForTheMess";
import { FoodSafety } from "./FoodSafety";
import { FinalCTA } from "./FinalCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <DiscoverPreview />
      <Mission />
      <ForTheMess />
      <FoodSafety />
      <FinalCTA />
    </>
  );
}
