import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Mail, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { CONTACT_EMAIL, METHODS, PRODUCTS, getProduct } from "@/data/products";
import { useQuote } from "@/lib/quote";
import { MethodIcon } from "@/components/site/MethodIcon";
import { ProductCard } from "@/components/site/ProductCard";
import { CompareToggle } from "@/components/site/Compare";
import { Reveal, Eyebrow, RevealLines } from "@/components/site/Reveal";

const Gallery = ({ p, colour }) => {
  const [idx, setIdx] = useState(0);
  const imgs = colour.images;
  const cur = imgs[Math.min(idx, imgs.length - 1)];
  const cutout = idx === 0 || (idx === 1 && colour.name !== "Gold" && p.slug !== "ddl720-5hws");

  return (
    <div>
      <div className="studio relative aspect-square overflow-hidden rounded-[32px]" data-testid="product-gallery-main">
        <div className="spotlight absolute inset-0" />
        <motion.img key={cur} src={cur} alt={`${p.name} ${colour.name}`} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className={`absolute inset-0 m-auto ${cutout ? "h-[86%] w-[86%] object-contain mix-blend-multiply" : "h-full w-full object-contain"}`} />
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2" data-lenis-prevent>
        {imgs.map((src, i) => (
          <button key={src + i} onClick={() => setIdx(i)} data-testid={`product-thumb-${i}`} className={`studio relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors ${i === idx ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
            <img src={src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
          </button>
        ))}
      </div>
    </div>
  );
};

const BuyBox = ({ p, colour, setColour }) => {
  const { add, setOpen } = useQuote();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const addQuote = () => { add(p.slug, colour.name, qty); toast.success(`${qty} × ${p.model} (${colour.name}) added to quote`); setOpen(true); };
  const trade = () => { add(p.slug, colour.name, qty); navigate(`/enquiry?type=trade`); };

  return (
    <div className="lg:sticky lg:top-28">
      <Eyebrow>{p.model} · {p.type}</Eyebrow>
      <RevealLines as="h1" testid="product-title" className="mt-4 font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl" lines={[p.name]} />
      <p className="mt-4 text-lg text-mist">{p.tagline}</p>
      <CompareToggle slug={p.slug} className="mt-5" />

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.2em] text-mist">Finish — <span className="text-bone" data-testid="product-selected-colour">{colour.name}</span></p>
        <div className="mt-3 flex gap-3">
          {p.colours.map((c) => (
            <button key={c.name} onClick={() => setColour(c)} data-testid={`colour-swatch-${c.name.toLowerCase().replace(/\s+/g, "-")}`} aria-label={c.name} className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-colors ${c.name === colour.name ? "border-gold" : "border-line"}`}>
              <span className="h-7 w-7 rounded-full" style={{ background: c.hex }} />
            </button>
          ))}
        </div>
        {p.colours.length === 1 && <p className="mt-2 text-xs text-mist">Available in {colour.name} only.</p>}
      </div>

      <div className="mt-8 rounded-3xl border border-line bg-surface p-6">
        <p className="font-display text-xl text-bone">{p.methods.length} ways to unlock</p>
        <div className="mt-4 grid grid-cols-2 gap-2" data-testid="product-unlock-methods">
          {p.methods.map((m) => (
            <span key={m} className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 text-sm text-bone/90">
              <MethodIcon method={m} className="h-4 w-4 text-gold" /> {METHODS[m].long}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-gold/30 bg-gold/[0.06] p-6" data-testid="product-price-on-request">
        <p className="font-display text-xl text-bone">Price on request</p>
        <p className="mt-1 text-sm text-mist">Contact <a className="text-gold underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Price enquiry: Philips ${p.model}`)}`} data-testid="product-email-link">{CONTACT_EMAIL}</a> for pricing. Builders & trades — ask about bulk rates.</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-line">
            <button className="p-3 text-bone" onClick={() => setQty(Math.max(1, qty - 1))} data-testid="product-qty-dec" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center text-bone" data-testid="product-qty">{qty}</span>
            <button className="p-3 text-bone" onClick={() => setQty(qty + 1)} data-testid="product-qty-inc" aria-label="Increase"><Plus className="h-4 w-4" /></button>
          </div>
          <button onClick={addQuote} data-testid="product-add-to-quote-button" className="flex-1 rounded-full bg-bone px-6 py-3.5 font-medium text-ink transition-colors hover:bg-white">Add to quote</button>
        </div>
        <button onClick={trade} data-testid="product-trade-pricing-button" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-ink transition-colors hover:bg-gold-bright"><Mail className="h-4 w-4" /> Request for Trade Pricing</button>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const [colour, setColour] = useState(p?.colours[0]);

  if (!p) return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-40 text-bone" data-testid="product-not-found">
      <p>Product not found.</p><Link to="/catalogue" className="text-gold">Back to catalogue</Link>
    </main>
  );

  const related = PRODUCTS.filter((x) => x.slug !== p.slug && x.methods.some((m) => p.methods.includes(m))).slice(0, 3);

  return (
    <main className="pb-28 pt-32" data-testid={`product-page-${p.slug}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Link to="/catalogue" data-testid="product-back-link" className="inline-flex items-center gap-2 text-sm text-mist hover:text-bone"><ArrowLeft className="h-4 w-4" /> Catalogue</Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7"><Gallery key={`${p.slug}-${colour.name}`} p={p} colour={colour} /></div>
          <div className="lg:col-span-5"><BuyBox p={p} colour={colour} setColour={setColour} /></div>
        </div>

        <section className="mt-28 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">Features & functionality</h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}><p className="text-lg leading-relaxed text-bone/85" data-testid="product-overview">{p.overview}</p></Reveal>
        </section>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2" data-testid="product-highlights">
          {p.highlights.map((h, i) => (
            <Reveal key={h.title} delay={(i % 2) * 0.05} className="h-full">
              <div className="flex h-full gap-5 bg-ink p-7 sm:p-8">
                <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-bone">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{h.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <section className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Specifications</Eyebrow>
            <dl className="mt-6 divide-y divide-line border-y border-line" data-testid="product-specs">
              {p.specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-sm sm:grid-cols-[12rem_1fr]">
                  <dt className="text-mist">{k}</dt><dd className="text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <Eyebrow>Ideal for</Eyebrow>
            <ul className="mt-6 space-y-3">
              {p.idealFor.map((x) => <li key={x} className="flex items-start gap-3 text-bone/90"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{x}</li>)}
            </ul>
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="mt-28">
            <Reveal><h2 className="font-display text-3xl font-semibold tracking-tight text-bone">You may also consider</h2></Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProductCard key={r.slug} p={r} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
