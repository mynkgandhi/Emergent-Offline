import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { CONTACT_EMAIL, METHODS, getProduct } from "@/data/products";
import { useQuote } from "@/lib/quote";
import { Logo } from "@/components/site/Logo";

const Sheet = ({ p, item }) => (
  <article className="spec-sheet break-inside-avoid border-b border-neutral-200 py-10 first:pt-0" data-testid={`spec-sheet-${p.slug}`}>
    <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
      <div className="studio relative aspect-square overflow-hidden rounded-2xl">
        <img src={(p.colours.find((c) => c.name === item.colour) || p.colours[0]).images[0]} alt={p.name} className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain mix-blend-multiply" />
      </div>
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-[#8A6A2B]">{p.model} · {item.colour} · Qty {item.qty}</p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-neutral-900">{p.name}</h2>
        <p className="mt-1 text-sm text-neutral-600">{p.tagline}</p>
        <p className="mt-4 text-sm font-semibold text-neutral-900">{p.methods.length} ways to unlock</p>
        <p className="text-sm text-neutral-700">{p.methods.map((m) => METHODS[m].long).join(" · ")}</p>
        <dl className="mt-4 grid grid-cols-[8.5rem_1fr] gap-x-4 gap-y-1.5 text-sm">
          {p.specs.map(([k, v]) => [<dt key={k} className="text-neutral-500">{k}</dt>, <dd key={`${k}v`} className="text-neutral-900">{v}</dd>])}
        </dl>
      </div>
    </div>
    <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {p.highlights.map((h) => (
        <li key={h.title} className="text-sm"><span className="font-semibold text-neutral-900">{h.title}.</span> <span className="text-neutral-600">{h.text}</span></li>
      ))}
    </ul>
  </article>
);

export default function SpecPack() {
  const { items } = useQuote();
  const date = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-neutral-100 pb-20 pt-32 print:bg-white print:p-0" data-testid="spec-pack-page">
      <div className="mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 print:hidden">
        <Link to="/catalogue" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900" data-testid="spec-pack-back-link"><ArrowLeft className="h-4 w-4" /> Back</Link>
        <button onClick={() => window.print()} disabled={!items.length} data-testid="spec-pack-download-button" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bone transition-colors hover:bg-[#1c2430] disabled:opacity-40">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>
      <p className="mx-auto mb-6 max-w-4xl px-6 text-xs text-neutral-500 print:hidden">Tip: in the print window choose "Save as PDF" as the destination.</p>

      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm sm:p-12 print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-neutral-900 pb-6">
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <div>
              <p className="font-display text-xl font-semibold text-neutral-900">Philips Smart Locks — Project Spec Pack</p>
              <p className="text-xs text-neutral-500">Prepared via Mindmaze, the Largest Trade Partner for Philips Smart Locks</p>
            </div>
          </div>
          <div className="text-right text-xs text-neutral-600">
            <p>{date}</p>
            <p>{CONTACT_EMAIL}</p>
          </div>
        </header>

        {items.length ? (
          <>
            <section className="border-b border-neutral-200 py-6" data-testid="spec-pack-summary">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Schedule</p>
              <table className="mt-3 w-full text-sm">
                <thead><tr className="text-left text-neutral-500"><th className="py-1 font-normal">Model</th><th className="font-normal">Product</th><th className="font-normal">Finish</th><th className="text-right font-normal">Qty</th></tr></thead>
                <tbody>
                  {items.map((x) => { const p = getProduct(x.slug); return (
                    <tr key={`${x.slug}-${x.colour}`} className="border-t border-neutral-100 text-neutral-900"><td className="py-2 font-mono text-xs">{p.model}</td><td>{p.name}</td><td>{x.colour}</td><td className="text-right">{x.qty}</td></tr>
                  ); })}
                </tbody>
              </table>
            </section>
            <div className="pt-10">{items.map((x) => <Sheet key={`${x.slug}-${x.colour}`} p={getProduct(x.slug)} item={x} />)}</div>
            <footer className="mt-6 text-xs text-neutral-500">Pricing on request — contact {CONTACT_EMAIL}. Specifications are supplied for guidance; confirm door preparation before installation.</footer>
          </>
        ) : (
          <p className="py-16 text-center text-neutral-600" data-testid="spec-pack-empty">Your quote list is empty. <Link to="/catalogue" className="text-[#8A6A2B] underline">Add locks from the catalogue</Link> to build a spec pack.</p>
        )}
      </div>
    </main>
  );
}
