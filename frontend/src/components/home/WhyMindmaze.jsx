import { Link } from "react-router-dom";
import { HardHat, Boxes, ClipboardCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { CONTACT_EMAIL } from "@/data/products";

const POINTS = [
  { icon: HeartHandshake, title: "Personal care", text: "A real person who knows your projects — not a ticket queue." },
  { icon: Boxes, title: "Bulk trade pricing", text: "Contact us for bulk prices for trade, from single jobs to whole developments." },
  { icon: ClipboardCheck, title: "Spec & door-fit support", text: "Help choosing the right lock for each door type, thickness and finish." },
  { icon: HardHat, title: "Seamless for your customers", text: "Smooth handover so homeowners love their lock from day one." },
];

export const WhyMindmaze = ({ showCta = true }) => (
  <section className="relative overflow-hidden bg-bone py-24 text-ink sm:py-32" data-testid="why-mindmaze-section">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Reveal>
        <Eyebrow className="!text-[#8A6A2B]">Why Mindmaze</Eyebrow>
        <h2 className="mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] sm:text-6xl">
          The Largest Trade Partner for <span className="italic font-light text-[#8A6A2B]">Philips Smart Locks.</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" delay={0.1}>
          <p className="text-lg leading-relaxed text-ink/80">
            From Mindmaze, we provide personal care for builders and trades — for a seamless experience for them and their customers. Whether you're fitting one front door or specifying a whole estate, we look after the details.
          </p>
          {showCta && (
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/enquiry?type=trade" data-testid="mindmaze-trade-pricing-button" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-bone transition-colors hover:bg-[#1c2430]">
                Contact us for bulk trade prices <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Trade bulk pricing enquiry")}`} data-testid="mindmaze-email-link" className="inline-flex items-center rounded-full border border-ink/25 px-7 py-4 text-ink transition-colors hover:border-ink">{CONTACT_EMAIL}</a>
            </div>
          )}
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {POINTS.map((pt, i) => (
            <Reveal key={pt.title} delay={0.1 + i * 0.06} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-ink/10 bg-white/60 p-7 transition-transform duration-500 hover:-translate-y-1" data-testid={`mindmaze-point-${i}`}>
                <pt.icon className="h-7 w-7 text-[#8A6A2B]" strokeWidth={1.4} />
                <h3 className="font-display text-xl font-semibold tracking-tight">{pt.title}</h3>
                <p className="text-sm leading-relaxed text-ink/70">{pt.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
