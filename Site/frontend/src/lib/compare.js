import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getProduct } from "@/data/products";

const Ctx = createContext(null);
const KEY = "pslh-compare";
const MAX = 3;

const load = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((s) => getProduct(s)).slice(0, MAX) : [];
  } catch {
    return [];
  }
};

export function CompareProvider({ children }) {
  const [slugs, setSlugs] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs]);

  const value = useMemo(() => {
    const has = (s) => slugs.includes(s);
    const toggle = (s) => {
      if (has(s)) return setSlugs(slugs.filter((x) => x !== s));
      if (slugs.length >= MAX) return toast.error(`Compare up to ${MAX} locks at a time`);
      setSlugs([...slugs, s]);
    };
    return { slugs, has, toggle, clear: () => setSlugs([]), max: MAX };
  }, [slugs]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCompare = () => useContext(Ctx);
