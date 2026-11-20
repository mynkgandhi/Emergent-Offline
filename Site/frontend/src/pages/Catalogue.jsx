import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { CONTACT_EMAIL, FILTER_METHODS, METHODS, PRODUCTS, TYPES } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { MethodIcon } from "@/components/site/MethodIcon";
import { RevealLines, Eyebrow, Reveal } from "@/components/site/Reveal";

const Chip = ({ active, onClick, children, testid }) => (
  <button onClick={onClick} data-testid={testid} className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-gold bg-gold text-ink" : "border-line text-bone/85 hover:border-bone/40"}`}>
    {children}
  </button>
);

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const methods = params.getAll("method").filter((m) => METHODS[m]);
  const type = params.get("type") || "";
  const q = params.get("q") || "";

  const update = (fn) => {
    const next = new URLSearchParams(params);
    fn(next);
    setParams(next, { replace: true });
  };
  const toggleMethod = (m) => update((n) => {
    const cur = n.getAll("method");
    n.delete("method");
    (cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]).forEach((x) => n.append("method", x));
  });

  const list = useMemo(() => PRODUCTS.filter((p) =>
    methods.every((m) => p.methods.includes(m)) &&
    (!type || p.type === type) &&
    (!q || `${p.model} ${p.name} ${p.tagline}`.toLowerCase().includes(q.toLowerCase()))
  ), [methods, type, q]);

  const hasFilters = methods.length || type || q;

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-8" data-testid="catalogue-page">
      <Eyebrow>Philips door locks & doorbell · {PRODUCTS.length} models</Eyebrow>
      <RevealLines as="h1" className="mt-5 font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl lg:text-6xl" lines={["The full catalogue."]} />
      <p className="mt-5 max-w-xl text-mist">Filter by how you want to unlock. Prices aren't listed — add locks to your quote list and we'll reply from {CONTACT_EMAIL}. Not sure which fits? <Link to="/finder" className="text-gold underline-offset-4 hover:underline" data-testid="catalogue-finder-link">Try the Door Fit Finder</Link>.</p>

      <Reveal className="sticky top-[84px] z-30 -mx-6 mt-10 border-y border-line bg-ink/85 px-6 py-4 backdrop-blur-xl lg:mx-0 lg:rounded-2xl lg:border">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1" data-lenis-prevent>
            {FILTER_METHODS.map((m) => (
              <Chip key={m} active={methods.includes(m)} onClick={() => toggleMethod(m)} testid={`filter-method-${m}`}>
                <MethodIcon method={m} /> {METHODS[m].label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1" data-lenis-prevent>
              <Chip active={!type} onClick={() => update((n) => n.delete("type"))} testid="filter-type-all">All types</Chip>
              {TYPES.map((t) => (
                <Chip key={t} active={type === t} onClick={() => update((n) => n.set("type", t))} testid={`filter-type-${t.toLowerCase().replace(/\s+/g, "-")}`}>{t}</Chip>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 rounded-full border border-line px-4 py-2 md:w-60">
                <Search className="h-4 w-4 text-mist" />
                <input value={q} onChange={(e) => update((n) => (e.target.value ? n.set("q", e.target.value) : n.delete("q")))} placeholder="Search model…" data-testid="catalogue-search-input" className="w-full bg-transparent text-sm text-bone placeholder:text-mist focus:outline-none" />
              </label>
              {hasFilters ? (
                <button onClick={() => setParams({}, { replace: true })} data-testid="filter-clear-button" className="inline-flex shrink-0 items-center gap-1 text-sm text-gold"><X className="h-4 w-4" />Clear</button>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-mist" data-testid="catalogue-result-count">{list.length} {list.length === 1 ? "product" : "products"}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full"><ProductCard p={p} /></Reveal>
        ))}
      </div>
      {!list.length && <p className="mt-10 rounded-3xl border border-dashed border-line p-12 text-center text-mist" data-testid="catalogue-empty">No locks match every selected function. Try removing a filter.</p>}
    </main>
  );
}
