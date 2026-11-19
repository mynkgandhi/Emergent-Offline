import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CONTACT_EMAIL, getProduct } from "@/data/products";
import { useQuote } from "@/lib/quote";

export const QuoteDrawer = () => {
  const { items, open, setOpen, setQty, remove } = useQuote();
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-line bg-ink text-bone sm:max-w-md" data-testid="quote-drawer" data-lenis-prevent>
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-bone">Your quote list</SheetTitle>
          <SheetDescription className="text-mist">No prices online — we'll reply with retail or trade pricing from {CONTACT_EMAIL}.</SheetDescription>
        </SheetHeader>
        <div className="-mx-2 mt-6 flex-1 space-y-3 overflow-y-auto px-2">
          {items.length === 0 && <p className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-mist" data-testid="quote-empty">Your list is empty. Add locks from the catalogue.</p>}
          {items.map((x, i) => {
            const p = getProduct(x.slug);
            const img = p.colours.find((c) => c.name === x.colour)?.images[0] ?? p.colours[0].images[0];
            return (
              <div key={`${x.slug}-${x.colour}`} className="flex gap-4 rounded-2xl border border-line bg-surface p-3" data-testid={`quote-item-${x.slug}`}>
                <div className="studio relative h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                  <img src={img} alt="" className="absolute inset-0 m-auto h-[90%] w-[90%] object-contain mix-blend-multiply" />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-mono text-[11px] text-gold">{p.model}</p>
                  <p className="text-sm text-bone">{p.name}</p>
                  <p className="text-xs text-mist">{x.colour}</p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-full border border-line">
                      <button className="p-1.5" onClick={() => setQty(i, x.qty - 1)} data-testid={`quote-dec-${x.slug}`} aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm" data-testid={`quote-qty-${x.slug}`}>{x.qty}</span>
                      <button className="p-1.5" onClick={() => setQty(i, x.qty + 1)} data-testid={`quote-inc-${x.slug}`} aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button onClick={() => remove(i)} className="p-1.5 text-mist hover:text-bone" data-testid={`quote-remove-${x.slug}`} aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          disabled={!items.length}
          onClick={() => { setOpen(false); navigate("/enquiry"); }}
          data-testid="quote-request-pricing-button"
          className="mt-4 w-full rounded-full bg-gold py-4 font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-40"
        >
          Request pricing for this list
        </button>
        <button
          disabled={!items.length}
          onClick={() => { setOpen(false); navigate("/spec-pack"); }}
          data-testid="quote-spec-pack-button"
          className="mt-2 w-full rounded-full border border-line py-3.5 text-sm text-bone transition-colors hover:border-gold disabled:opacity-40"
        >
          Download trade spec pack (PDF)
        </button>
      </SheetContent>
    </Sheet>
  );
};
