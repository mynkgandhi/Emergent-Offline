import { Link } from "react-router-dom";
import { Check, Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { METHODS, PRODUCTS, getProduct } from "@/data/products";
import { useCompare } from "@/lib/compare";
import { useQuote } from "@/lib/quote";
import { MethodIcon } from "@/components/site/MethodIcon";
import { RevealLines, Eyebrow } from "@/components/site/Reveal";

const ALL_METHODS = Object.keys(METHODS);
const Cell = ({ children, className = "" }) => <div className={`border-b border-line px-4 py-4 text-sm ${className}`}>{children}</div>;

const Picker = () => {
  const { slugs, toggle } = useCompare();
  return (
    <div className="mt-8 flex flex-wrap gap-2" data-testid="compare-picker">
      {PRODUCTS.filter((p) => !slugs.includes(p.slug)).map((p) => (
        <button key={p.slug} onClick={() => toggle(p.slug)} data-testid={`compare-add-${p.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-bone/85 transition-colors hover:border-gold hover:text-gold">
          <Plus className="h-3 w-3" /> {p.model}
        </button>
      ))}
    </div>
  );
};

export default function Compare() {
  const { slugs, toggle } = useCompare();
  const { add } = useQuote();
  const list = slugs.map(getProduct);
  const cols = { gridTemplateColumns: `minmax(130px,180px) repeat(${Math.max(list.length, 1)}, minmax(200px,1fr))` };
  const methods = ALL_METHODS.filter((m) => list.some((p) => p.methods.includes(m)));
  const row = (label, render) => (
    <>
      <Cell className="sticky left-0 z-10 bg-ink text-mist">{label}</Cell>
      {list.map((p) => <Cell key={p.slug} className="text-bone">{render(p)}</Cell>)}
    </>
  );

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-8" data-testid="compare-page">
      <Eyebrow>Side by side</Eyebrow>
      <RevealLines as="h1" testid="compare-title" className="mt-5 font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl lg:text-6xl" lines={["Compare locks."]} />
      <p className="mt-5 max-w-xl text-mist">Pick two or three locks to compare unlock methods, features and specs.</p>
      {list.length < 3 && <Picker />}

      {list.length > 0 && (
        <div className="mt-12 overflow-x-auto rounded-[28px] border border-line" data-lenis-prevent data-testid="compare-table">
          <div className="grid min-w-max" style={cols}>
            <Cell className="sticky left-0 z-10 bg-ink" />
            {list.map((p) => (
              <Cell key={p.slug} className="bg-surface">
                <div className="flex justify-end"><button onClick={() => toggle(p.slug)} aria-label="Remove" data-testid={`compare-remove-${p.slug}`} className="rounded-full p-1 text-mist hover:text-bone"><X className="h-4 w-4" /></button></div>
                <div className="studio relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl">
                  <img src={p.colours[0].images[0]} alt={p.name} className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain mix-blend-multiply" />
                </div>
                <p className="mt-4 font-mono text-[11px] text-gold">{p.model}</p>
                <Link to={`/product/${p.slug}`} className="mt-1 block font-display text-lg text-bone hover:text-gold">{p.name}</Link>
                <button onClick={() => { add(p.slug, p.colours[0].name); toast.success(`${p.model} added to quote`); }} data-testid={`compare-add-quote-${p.slug}`} className="mt-3 rounded-full bg-gold px-4 py-2 text-xs font-medium text-ink hover:bg-gold-bright">Add to quote</button>
              </Cell>
            ))}
            {row("Type", (p) => p.type)}
            {row("Best for", (p) => p.door)}
            {row("Finishes", (p) => p.colours.map((c) => c.name).join(", "))}
            {row("Ways to unlock", (p) => <span className="font-display text-2xl text-gold">{p.methods.length}</span>)}
            {methods.map((m) => (
              <Row key={m} m={m} list={list} />
            ))}
            {row("Key features", (p) => (
              <ul className="space-y-1.5">{p.highlights.map((h) => <li key={h.title} className="text-bone/85">• {h.title}</li>)}</ul>
            ))}
            {row("Door thickness", (p) => (p.thickness ? `${p.thickness[0]}–${p.thickness[1]} mm` : "Confirm with us"))}
          </div>
        </div>
      )}
    </main>
  );
}

const Row = ({ m, list }) => (
  <>
    <Cell className="sticky left-0 z-10 flex items-center gap-2 bg-ink text-mist"><MethodIcon method={m} className="h-4 w-4 text-gold" />{METHODS[m].label}</Cell>
    {list.map((p) => (
      <Cell key={p.slug} className="text-bone">
        {p.methods.includes(m) ? <Check className="h-5 w-5 text-gold" data-testid={`compare-${p.slug}-${m}-yes`} /> : <Minus className="h-5 w-5 text-white/25" />}
      </Cell>
    ))}
  </>
);
