import { Link } from "react-router-dom";
import { FILTER_METHODS, METHODS, PRODUCTS } from "@/data/products";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { MethodIcon } from "@/components/site/MethodIcon";

export const ShopByFunction = () => (
  <section className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8" data-testid="shop-by-function-section">
    <Reveal>
      <Eyebrow>Shop by function</Eyebrow>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-bone sm:text-4xl">How would you like to open your door?</h2>
    </Reveal>
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {FILTER_METHODS.map((m, i) => {
        const n = PRODUCTS.filter((p) => p.methods.includes(m)).length;
        return (
          <Reveal key={m} delay={i * 0.04}>
            <Link to={`/catalogue?method=${m}`} data-testid={`shop-function-${m}`} className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-colors duration-500 hover:border-gold hover:bg-gold">
              <span>
                <MethodIcon method={m} className="h-6 w-6 text-gold transition-colors group-hover:text-ink" />
                <span className="mt-4 block font-display text-lg text-bone transition-colors group-hover:text-ink">{METHODS[m].label}</span>
              </span>
              <span className="font-mono text-xs text-mist transition-colors group-hover:text-ink">{n}</span>
            </Link>
          </Reveal>
        );
      })}
    </div>
    <Reveal className="mt-6">
      <Link to="/finder" data-testid="home-finder-cta" className="group flex flex-col justify-between gap-4 rounded-3xl border border-gold/30 bg-gold/[0.06] p-7 transition-colors hover:border-gold sm:flex-row sm:items-center">
        <span>
          <span className="block font-display text-2xl text-bone">Not sure which lock fits your door?</span>
          <span className="mt-1 block text-sm text-mist">Answer 5 quick questions in the Door Fit Finder.</span>
        </span>
        <span className="w-fit rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors group-hover:bg-gold-bright">Start the Fit Finder</span>
      </Link>
    </Reveal>
  </section>
);
