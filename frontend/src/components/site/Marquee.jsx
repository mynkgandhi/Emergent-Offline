const ITEMS = [
  "Largest Trade Partner for Philips Smart Locks",
  "Personal care for builders & trades",
  "Bulk trade pricing on request",
  "3D Face · Palm Vein · Fingerprint",
  "Secure, safe & easy access for your family",
];

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {ITEMS.map((t) => (
      <span key={t} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-display text-3xl font-light tracking-tight text-bone/90 sm:text-5xl">{t}</span>
        <span className="text-2xl text-gold sm:text-3xl">✦</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <section className="relative overflow-hidden border-y border-line bg-ink py-8 sm:py-10" data-testid="editorial-marquee">
    <div className="marquee-track flex w-max">
      <Row />
      <Row hidden />
    </div>
  </section>
);
