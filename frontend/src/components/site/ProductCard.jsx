import { Link } from "react-router-dom";
import { Plus, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { METHODS } from "@/data/products";
import { useQuote } from "@/lib/quote";
import { MethodIcon } from "./MethodIcon";
import { CompareToggle } from "./Compare";

export const MethodChips = ({ methods, max = 8, size = "sm" }) => (
  <div className="flex flex-wrap gap-1.5">
    {methods.slice(0, max).map((m) => (
      <span key={m} title={METHODS[m].long} className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] text-bone/85 ${size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}`}>
        <MethodIcon method={m} className="h-3.5 w-3.5 text-gold" />
        {METHODS[m].label}
      </span>
    ))}
    {methods.length > max && <span className="px-2 py-1 text-[11px] text-mist">+{methods.length - max}</span>}
  </div>
);

export const ProductCard = ({ p }) => {
  const { add } = useQuote();
  const imgs = p.colours[0].images;
  const swap = imgs[1] && p.slug !== "ddl720-5hws";
  const addQuote = (e) => {
    e.preventDefault();
    add(p.slug, p.colours[0].name);
    toast.success(`${p.model} added to your quote`);
  };

  return (
    <Link to={`/product/${p.slug}`} data-testid={`product-card-${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 hover:border-gold/40">
      <div className="studio relative aspect-[4/5] overflow-hidden">
        <img src={imgs[0]} alt={p.name} loading="lazy" className={`absolute inset-0 m-auto transition-[opacity,transform] duration-700 group-hover:scale-[1.04] h-[86%] w-[86%] object-contain mix-blend-multiply ${swap ? "group-hover:opacity-0" : ""}`} />
        {swap && <img src={imgs[1]} alt="" loading="lazy" className="absolute inset-0 m-auto h-[86%] w-[86%] object-contain opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-100" />}
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone">{p.type}</span>
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">{p.methods.length} ways</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-gold">{p.model}</p>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-bone">{p.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">{p.tagline}</p>
        </div>
        <MethodChips methods={p.methods} max={5} />
        <CompareToggle slug={p.slug} className="w-fit" />
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="text-xs text-mist">Price on request</span>
          <div className="flex items-center gap-2">
            <button onClick={addQuote} data-testid={`add-to-quote-${p.slug}`} aria-label="Add to quote" className="grid h-9 w-9 place-items-center rounded-full border border-line text-bone transition-colors hover:border-gold hover:bg-gold hover:text-ink">
              <Plus className="h-4 w-4" />
            </button>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
