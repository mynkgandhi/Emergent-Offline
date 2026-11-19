import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CONTACT_EMAIL, getProduct } from "@/data/products";

const QuoteCtx = createContext(null);
const KEY = "pslh-quote";

const load = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((i) => getProduct(i?.slug)) : [];
  } catch {
    return [];
  }
};

export function QuoteProvider({ children }) {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const add = (slug, colour, qty = 1) =>
      setItems((prev) => {
        const i = prev.findIndex((x) => x.slug === slug && x.colour === colour);
        if (i === -1) return [...prev, { slug, colour, qty }];
        return prev.map((x, k) => (k === i ? { ...x, qty: x.qty + qty } : x));
      });
    const setQty = (idx, qty) => setItems((prev) => prev.map((x, k) => (k === idx ? { ...x, qty: Math.max(1, qty) } : x)));
    const remove = (idx) => setItems((prev) => prev.filter((_, k) => k !== idx));
    const clear = () => setItems([]);
    const count = items.reduce((n, x) => n + x.qty, 0);
    return { items, add, setQty, remove, clear, count, open, setOpen };
  }, [items, open]);

  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export const useQuote = () => useContext(QuoteCtx);

export function buildMailto({ subject, lines }) {
  const body = lines.filter((l) => l !== null && l !== undefined).join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function quoteLines(items) {
  return items.map((x) => {
    const p = getProduct(x.slug);
    return `• ${x.qty} × Philips ${p?.model} (${x.colour})`;
  });
}
