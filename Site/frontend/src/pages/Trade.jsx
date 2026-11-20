import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { WhyMindmaze } from "@/components/home/WhyMindmaze";
import { WhyPhilips } from "@/components/home/WhyPhilips";
import { RevealLines, Eyebrow, Reveal } from "@/components/site/Reveal";

const STEPS = [
  ["Tell us about the project", "Door types, quantities, finishes and timelines."],
  ["Get trade pricing", "Bulk rates from the Largest Trade Partner for Philips Smart Locks."],
  ["Supply & support", "Personal care from order through to your customer's handover."],
];

export default function Trade() {
  return (
    <main data-testid="trade-page">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 lg:px-8">
        <Eyebrow>For builders, developers & trades</Eyebrow>
        <RevealLines as="h1" testid="trade-title" className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl lg:text-6xl" lines={["Personal care for the", "people who build homes."]} />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-mist">From Mindmaze, we provide personal care for builders and trades — for a seamless experience for them and their customers. Contact us for bulk prices for trade.</p>
          <Link to="/enquiry?type=trade" data-testid="trade-hero-pricing-button" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-medium text-ink transition-colors hover:bg-gold-bright">
            Request for Trade Pricing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-surface p-8" data-testid={`trade-step-${i}`}>
                <span className="font-mono text-xs text-gold">STEP 0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-bone">{t}</h3>
                <p className="mt-2 text-sm text-mist">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <WhyMindmaze />
      <WhyPhilips />
    </main>
  );
}
