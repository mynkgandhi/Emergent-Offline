import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { RevealLines, Eyebrow } from "@/components/site/Reveal";

const STEPS = [
  { key: "location", q: "Where is the door?", options: [
    ["front", "Front / main entry"], ["interior", "Interior room or home office"], ["apartment", "Apartment, gate or secondary door"]] },
  { key: "door", q: "What kind of door and lock is there now?", options: [
    ["mortise", "Timber door with a full mortise lock"], ["narrow", "Aluminium or narrow-frame door"], ["deadbolt", "Standard deadbolt hole"], ["rim", "Existing rim / night latch"], ["unsure", "Not sure"]] },
  { key: "thickness", q: "How thick is the door?", options: [
    ["thin", "Under 35 mm"], ["std", "35–55 mm"], ["thick", "55–60 mm"], ["xl", "Over 60 mm"], ["unsure", "Not sure"]] },
  { key: "method", q: "How would you most like to unlock?", options: [
    ["face", "Face — hands-free"], ["palm", "Palm — touch-free"], ["fingerprint", "Fingerprint"], ["any", "No preference"]] },
  { key: "video", q: "Do you want to see who's at the door?", options: [["yes", "Yes, video / doorbell"], ["no", "Not needed"]] },
];

const RANGE = { thin: [0, 35], std: [35, 55], thick: [55, 60], xl: [60, 200] };
const DOOR_FIT = {
  mortise: ["Push-Pull", "Lever Handle"],
  narrow: ["Lever Handle"],
  deadbolt: ["Deadbolt"],
  rim: ["Rim Lock"],
};
const LOCATION_FIT = {
  front: ["Front door", "Front & secondary", "Front & interior"],
  interior: ["Front & interior", "Interior & retrofit", "Interior & apartments"],
  apartment: ["Front & secondary", "Interior & apartments", "Interior & retrofit"],
};

const score = (p, a) => {
  if (p.type === "Video Doorbell") return -1;
  let s = 0;
  if (LOCATION_FIT[a.location]?.includes(p.door)) s += 3;
  if (DOOR_FIT[a.door]?.includes(p.type)) s += 4;
  if (a.door === "narrow" && p.slug === "ddl615") s += 4;
  if (a.method !== "any") s += p.methods.includes(a.method) ? 5 : -6;
  if (a.video === "yes") s += p.methods.includes("video") ? 3 : 0;
  const r = RANGE[a.thickness];
  if (r && p.thickness) s += p.thickness[0] <= r[1] && p.thickness[1] >= r[0] ? 2 : -5;
  return s + p.methods.length * 0.1;
};

export default function Finder() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const done = step >= STEPS.length;
  const pick = (k, v) => { setAnswers({ ...answers, [k]: v }); setStep(step + 1); };
  const reset = () => { setAnswers({}); setStep(0); };

  const results = done ? PRODUCTS.map((p) => [p, score(p, answers)]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([p]) => p) : [];
  const wantsVideoAddon = done && answers.video === "yes" && !results.some((p) => p.methods.includes("video"));

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:px-8" data-testid="finder-page">
      <Eyebrow>Door Fit Finder</Eyebrow>
      <RevealLines as="h1" testid="finder-title" className="mt-5 font-display text-4xl font-semibold leading-[1] tracking-[-0.03em] text-bone sm:text-5xl lg:text-6xl" lines={["Find the lock", "that fits your door."]} />
      <div className="mt-10 flex gap-1.5" data-testid="finder-progress">
        {STEPS.map((s, i) => <span key={s.key} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step ? "bg-gold" : "bg-white/10"}`} />)}
      </div>

      <div className="relative mt-12 min-h-[320px]">
        <AnimatePresence initial={false}>
          {!done && (
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, position: "absolute" }} transition={{ duration: 0.4 }} className="w-full">
              <p className="font-mono text-xs text-gold">QUESTION {step + 1} / {STEPS.length}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-bone sm:text-4xl" data-testid="finder-question">{STEPS[step].q}</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {STEPS[step].options.map(([v, label]) => (
                  <button key={v} onClick={() => pick(STEPS[step].key, v)} data-testid={`finder-option-${STEPS[step].key}-${v}`} className="rounded-2xl border border-line bg-surface p-6 text-left font-display text-lg text-bone transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
                    {label}
                  </button>
                ))}
              </div>
              {step > 0 && <button onClick={() => setStep(step - 1)} data-testid="finder-back-button" className="mt-8 inline-flex items-center gap-2 text-sm text-mist hover:text-bone"><ArrowLeft className="h-4 w-4" /> Back</button>}
            </motion.div>
          )}
        </AnimatePresence>

        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} data-testid="finder-results">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-bone sm:text-4xl">{results.length ? "Our top picks for your door" : "Let's find it together"}</h2>
              <button onClick={reset} data-testid="finder-restart-button" className="inline-flex items-center gap-2 text-sm text-gold"><RotateCcw className="h-4 w-4" /> Start again</button>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-mist">These are a guide only. Door preparation varies, so our team will confirm the fit before you order. Add picks to your quote and we'll check them for you.</p>
            {results.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
            ) : (
              <p className="mt-10 rounded-3xl border border-dashed border-line p-10 text-center text-mist" data-testid="finder-no-results">No lock matches all of your answers. <Link to="/enquiry" className="text-gold">Tell us about your door</Link> and we'll recommend one.</p>
            )}
            {wantsVideoAddon && (
              <p className="mt-8 text-sm text-mist" data-testid="finder-video-addon">Want video too? Pair your lock with the <Link to="/product/dda270x" className="text-gold">Philips DDA270X Smart Door Viewer</Link>.</p>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
