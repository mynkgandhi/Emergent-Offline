import { useSearchParams } from "react-router-dom";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/products";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { RevealLines, Eyebrow, Reveal } from "@/components/site/Reveal";

export default function Enquiry() {
  const [params] = useSearchParams();
  const trade = params.get("type") === "trade";

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-8" data-testid="enquiry-page">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{trade ? "Trade pricing" : "Contact for price"}</Eyebrow>
          <RevealLines as="h1" testid="enquiry-title" className="mt-5 font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl lg:text-6xl" lines={trade ? ["Request for", "Trade Pricing."] : ["Let's talk", "pricing."]} />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-mist">We don't list prices online. Tell us what you need and we'll come back with retail, bulk or trade pricing. Builders and trades — contact us for bulk prices.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} data-testid="enquiry-direct-email-link" className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-5 font-display text-xl text-bone transition-colors hover:border-gold">
              <Mail className="h-5 w-5 text-gold" /> {CONTACT_EMAIL}
            </a>
            <p className="mt-6 max-w-md text-sm text-mist">Mindmaze — the Largest Trade Partner for Philips Smart Locks.</p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="rounded-[28px] border border-line bg-surface p-6 sm:p-10"><EnquiryForm /></div>
        </Reveal>
      </div>
    </main>
  );
}
