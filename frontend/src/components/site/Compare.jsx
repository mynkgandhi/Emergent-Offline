import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Columns3, X } from "lucide-react";
import { getProduct } from "@/data/products";
import { useCompare } from "@/lib/compare";

export const CompareToggle = ({ slug, className = "" }) => {
  const { has, toggle } = useCompare();
  const on = has(slug);
  return (
    <button
      onClick={(e) => { e.preventDefault(); toggle(slug); }}
      data-testid={`compare-toggle-${slug}`}
      aria-pressed={on}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-gold bg-gold text-ink" : "border-line text-bone/85 hover:border-gold"} ${className}`}
    >
      <Columns3 className="h-3.5 w-3.5" /> {on ? "Comparing" : "Compare"}
    </button>
  );
};

export const CompareBar = () => {
  const { slugs, toggle, clear, max } = useCompare();
  const { pathname } = useLocation();
  const show = slugs.length > 0 && !["/compare", "/spec-pack"].includes(pathname);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl border border-gold/30 bg-ink/90 p-3 backdrop-blur-xl print:hidden" data-testid="compare-bar">
          <div className="flex flex-1 flex-wrap gap-2">
            {slugs.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1 pl-3 pr-1 font-mono text-[11px] text-bone">
                {getProduct(s).model}
                <button onClick={() => toggle(s)} aria-label="Remove" data-testid={`compare-bar-remove-${s}`} className="rounded-full p-1 hover:bg-white/10"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {slugs.length < max && <span className="self-center text-xs text-mist">Add up to {max - slugs.length} more</span>}
          </div>
          <button onClick={clear} className="text-xs text-mist hover:text-bone" data-testid="compare-bar-clear">Clear</button>
          <Link to="/compare" data-testid="compare-bar-open" className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${slugs.length > 1 ? "bg-gold text-ink hover:bg-gold-bright" : "pointer-events-none bg-white/10 text-mist"}`}>
            Compare {slugs.length}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
