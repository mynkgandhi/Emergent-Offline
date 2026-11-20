import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { FEATURED } from "@/data/products";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { MethodChips } from "@/components/site/ProductCard";

const SPANS = {
  ddl902: "lg:col-span-7 lg:row-span-2",
  ddl801: "lg:col-span-5",
  "ddl720-5hws": "lg:col-span-5",
  "ddl720-mvp-17hws": "lg:col-span-12",
};

const BentoCard = ({ p, i }) => {
  const big = p.slug === "ddl902";
  const wide = p.slug === "ddl720-mvp-17hws";
  return (
    <Reveal delay={i * 0.08} className={`${SPANS[p.slug]} h-full`}>
      <div data-testid={`featured-card-${p.slug}`} className={`group relative flex h-full overflow-hidden rounded-[28px] border border-line bg-surface transition-colors duration-500 hover:border-gold/40 ${wide ? "flex-col md:flex-row" : "flex-col"}`}>
        <Link to={`/product/${p.slug}`} className={`studio relative block overflow-hidden ${big ? "min-h-[380px] flex-1" : wide ? "min-h-[300px] md:w-[42%]" : "min-h-[300px] flex-1"}`}>
          <div className="spotlight absolute inset-0" />
          <img src={p.colours[0].images[0]} alt={p.name} loading="lazy" className={`absolute inset-0 m-auto transition-transform duration-1000 ease-out group-hover:scale-[1.05] h-[86%] w-[86%] object-contain mix-blend-multiply`} />
          <span className="absolute left-5 top-5 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone">0{i + 1}</span>
        </Link>
        <div className={`flex flex-col gap-4 p-6 sm:p-8 ${wide ? "md:flex-1 md:justify-center" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-gold">{p.model}</p>
              <h3 className={`mt-2 font-display font-semibold tracking-tight text-bone ${big ? "text-3xl" : "text-2xl"}`}>{p.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-mist">{p.tagline}</p>
            </div>
            <Link to={`/product/${p.slug}`} aria-label={`View ${p.model}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
          <MethodChips methods={p.methods} max={big || wide ? 8 : 5} />
          <Link to={`/enquiry?type=trade&product=${p.slug}`} data-testid={`featured-trade-pricing-${p.slug}`} className="mt-2 inline-flex w-fit items-center gap-2 border-b border-gold/50 pb-1 text-sm text-gold transition-colors hover:border-gold hover:text-gold-bright">
            Request for Trade Pricing <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

export const FeaturedBento = () => (
  <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8" data-testid="featured-section">
    <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
        <Eyebrow>The trade favourites</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-bone sm:text-5xl">Four locks our builders specify most.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <Link to="/catalogue" data-testid="featured-view-all-link" className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-bone">View full catalogue <ArrowUpRight className="h-4 w-4" /></Link>
      </Reveal>
    </div>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
      {FEATURED.map((p, i) => <BentoCard key={p.slug} p={p} i={i} />)}
    </div>
  </section>
);
