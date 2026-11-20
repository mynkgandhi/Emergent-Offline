import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/site/Marquee";
import { FeaturedBento } from "@/components/home/FeaturedBento";
import { WaysIn } from "@/components/home/WaysIn";
import { WhyPhilips } from "@/components/home/WhyPhilips";
import { WhyMindmaze } from "@/components/home/WhyMindmaze";
import { ShopByFunction } from "@/components/home/ShopByFunction";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <FeaturedBento />
      <WaysIn />
      <WhyPhilips />
      <ShopByFunction />
      <WhyMindmaze />
    </main>
  );
}
