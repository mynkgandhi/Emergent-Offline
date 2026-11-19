import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProduct, METHODS } from "@/data/products";
import { Reveal, Eyebrow } from "@/components/site/Reveal";
import { MethodIcon } from "@/components/site/MethodIcon";

const NOTES = {
  face: "Radar wakes the 3D camera within ~1 m. Hands full? It already knows you.",
  palm: "Near-infrared vein mapping. Touch-free, and works with dry or shallow fingerprints.",
  fingerprint: "A light touch for the moments you'd rather not wait.",
  pin: "Anti-peep dummy PIN hides your real code inside a longer sequence.",
  keytag: "RFID key tags for kids, cleaners and trades on site.",
  key: "A mechanical backup key — always there, rarely needed.",
  app: "Unlock remotely and share temporary codes with Philips Home Access.",
  video: "Doorbell rings your phone. See, talk and let them in from anywhere.",
};

export const WaysIn = () => {
  const p = getProduct("ddl902");
  const [active, setActive] = useState("face");
  const gold = p.colours[0].images;

  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32" data-testid="ways-in-section">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>DDL902 · Unlock matrix</Eyebrow>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-bone sm:text-5xl">More than six ways through the door.</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mist">Most listings stop at face and palm. The DDL902 also opens with fingerprint, PIN code, key tags, a mechanical key and the app — so every member of the family has a way in that suits them.</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <div className="studio relative mx-auto aspect-square max-w-[420px] overflow-hidden rounded-[32px]">
                <div className="spotlight absolute inset-0" />
                <img src={gold[0]} alt="Philips DDL902 in Gold" className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain mix-blend-multiply" />
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-ink/90 p-3 backdrop-blur">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink"><MethodIcon method={active} /></span>
                  <span className="text-sm text-bone" data-testid="ways-in-active-label">{METHODS[active].long}</span>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {p.methods.map((m, i) => (
            <Reveal key={m} delay={i * 0.04}>
              <li
                onMouseEnter={() => setActive(m)}
                onClick={() => setActive(m)}
                data-testid={`ways-in-method-${m}`}
                className={`group grid cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-6 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:py-8 ${active === m ? "text-bone" : "text-bone/55 hover:text-bone"}`}
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span>
                  <span className="block font-display text-2xl tracking-tight sm:text-4xl">{METHODS[m].long}</span>
                  <span className={`mt-2 block max-w-lg text-sm text-mist transition-[opacity] duration-500 ${active === m ? "opacity-100" : "opacity-70"}`}>{NOTES[m]}</span>
                </span>
                <span className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 ${active === m ? "border-gold bg-gold text-ink" : "border-line text-bone"}`}><MethodIcon method={m} className="h-5 w-5" /></span>
              </li>
            </Reveal>
          ))}
          <Reveal className="pt-10">
            <Link to="/product/ddl902" data-testid="ways-in-ddl902-link" className="inline-flex items-center gap-3 rounded-full border border-gold/50 px-6 py-3 text-sm text-gold transition-colors hover:bg-gold hover:text-ink">Explore the DDL902</Link>
          </Reveal>
        </ol>
      </div>
    </section>
  );
};
