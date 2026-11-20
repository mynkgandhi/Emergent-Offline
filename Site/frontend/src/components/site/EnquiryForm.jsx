import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL, getProduct } from "@/data/products";
import { buildMailto, quoteLines, useQuote } from "@/lib/quote";

const ROLES = ["Builder", "Trade / Installer / Locksmith", "Developer", "Architect / Designer", "Homeowner"];
const field = "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3.5 text-bone placeholder:text-mist/80 transition-colors focus:border-gold focus:outline-none";

const Input = ({ label, testid, ...rest }) => (
  <label className="block">
    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{label}</span>
    <input className={field} data-testid={testid} {...rest} />
  </label>
);

export const EnquiryForm = () => {
  const [params] = useSearchParams();
  const { items, setOpen } = useQuote();
  const prefill = getProduct(params.get("product"));
  const [f, setF] = useState({
    name: "", company: "", email: "", phone: "", postcode: "", units: "",
    role: params.get("type") === "trade" ? ROLES[0] : ROLES[4],
    message: prefill ? `I'd like pricing for the Philips ${prefill.model}.` : "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const trade = f.role !== "Homeowner";
    const href = buildMailto({
      subject: `${trade ? "Trade pricing request" : "Price enquiry"} — ${f.name}${f.company ? ` (${f.company})` : ""}`,
      lines: [
        `Name: ${f.name}`, f.company && `Company: ${f.company}`, `I am a: ${f.role}`, `Email: ${f.email}`,
        f.phone && `Phone: ${f.phone}`, f.postcode && `Postcode: ${f.postcode}`, f.units && `Estimated quantity / project size: ${f.units}`,
        "", "Products:", ...(items.length ? quoteLines(items) : [prefill ? `• Philips ${prefill.model}` : "• (not specified)"]),
        "", "Message:", f.message || "-",
      ],
    });
    window.location.href = href;
    toast.success("Opening your email app — just press send.");
  };

  return (
    <form onSubmit={submit} className="space-y-5" data-testid="enquiry-form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name *" required value={f.name} onChange={set("name")} testid="enquiry-name-input" placeholder="Jane Smith" />
        <Input label="Company" value={f.company} onChange={set("company")} testid="enquiry-company-input" placeholder="Smith Building Co." />
        <Input label="Email *" type="email" required value={f.email} onChange={set("email")} testid="enquiry-email-input" placeholder="you@company.com.au" />
        <Input label="Phone" value={f.phone} onChange={set("phone")} testid="enquiry-phone-input" placeholder="04xx xxx xxx" />
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">I am a</span>
          <select value={f.role} onChange={set("role")} data-testid="enquiry-role-select" className={`${field} appearance-none`}>
            {ROLES.map((r) => <option key={r} className="bg-ink">{r}</option>)}
          </select>
        </label>
        <Input label="Postcode" value={f.postcode} onChange={set("postcode")} testid="enquiry-postcode-input" placeholder="3000" />
      </div>
      <Input label="Estimated quantity / project size" value={f.units} onChange={set("units")} testid="enquiry-units-input" placeholder="e.g. 24 townhouses, 30 locks" />
      <div className="rounded-2xl border border-line p-4" data-testid="enquiry-products-summary">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.18em] text-mist">Products in your quote</span>
          <button type="button" onClick={() => setOpen(true)} className="text-xs text-gold" data-testid="enquiry-edit-quote-button">Edit list</button>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-bone">
          {items.length ? quoteLines(items).map((l) => <li key={l}>{l}</li>) : <li className="text-mist">{prefill ? `• Philips ${prefill.model}` : "No products added — that's fine, tell us what you need below."}</li>}
        </ul>
      </div>
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">Message</span>
        <textarea rows={5} value={f.message} onChange={set("message")} data-testid="enquiry-message-input" className={field} placeholder="Door types, finishes, timelines…" />
      </label>
      <button type="submit" data-testid="enquiry-submit-button" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-ink transition-colors hover:bg-gold-bright sm:w-auto">
        <Mail className="h-4 w-4" /> Send enquiry to {CONTACT_EMAIL}
      </button>
      <p className="text-xs text-mist">Submitting opens your email app with everything pre-filled, addressed to {CONTACT_EMAIL}.</p>
    </form>
  );
};
