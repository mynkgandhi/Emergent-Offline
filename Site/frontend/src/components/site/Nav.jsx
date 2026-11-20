import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "./Logo";
import { useQuote } from "@/lib/quote";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/finder", label: "Fit Finder" },
  { to: "/compare", label: "Compare" },
  { to: "/trade", label: "Trade" },
  { to: "/enquiry", label: "Contact" },
];

export const Nav = () => {
  const { count, setOpen } = useQuote();
  const [menu, setMenu] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 print:hidden">
      <div className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl border border-line bg-ink/70 px-4 py-3 backdrop-blur-xl sm:mx-6 lg:mx-auto lg:px-6">
        <Link to="/" data-testid="nav-logo-link"><Wordmark /></Link>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}-link`}
              className={({ isActive }) => `rounded-full px-3 py-2 text-sm transition-colors lg:px-4 ${isActive ? "bg-white/10 text-bone" : "text-mist hover:text-bone"}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} data-testid="nav-quote-button" className="relative flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-bone transition-colors hover:bg-gold hover:text-ink">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Quote</span>
            <span data-testid="nav-quote-count" className="grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-semibold text-ink">{count}</span>
          </button>
          <button className="rounded-full p-2 text-bone md:hidden" onClick={() => setMenu(!menu)} data-testid="nav-mobile-menu-button" aria-label="Menu">
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-3 mt-2 rounded-2xl border border-line bg-ink/95 p-3 backdrop-blur-xl md:hidden" data-testid="nav-mobile-panel">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end onClick={() => setMenu(false)} data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}-link`} className="block rounded-xl px-4 py-3 font-display text-lg text-bone hover:bg-white/5">
                {l.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
