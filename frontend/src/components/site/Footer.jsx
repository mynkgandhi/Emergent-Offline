import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Wordmark } from "./Logo";
import { CONTACT_EMAIL } from "@/data/products";

export const Footer = () => (
  <footer className="border-t border-line bg-ink print:hidden">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 lg:px-8">
      <div className="md:col-span-5">
        <Wordmark />
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
          Mindmaze is the Largest Trade Partner for Philips Smart Locks — providing personal care for builders and trades, for a seamless experience for them and their customers.
        </p>
      </div>
      <div className="md:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Explore</p>
        <ul className="mt-5 space-y-3 text-sm text-mist">
          <li><Link to="/catalogue" className="hover:text-bone" data-testid="footer-catalogue-link">Full catalogue</Link></li>
          <li><Link to="/catalogue?type=Video%20Doorbell" className="hover:text-bone" data-testid="footer-doorbell-link">Video doorbell</Link></li>
          <li><Link to="/finder" className="hover:text-bone" data-testid="footer-finder-link">Door Fit Finder</Link></li>
          <li><Link to="/trade" className="hover:text-bone" data-testid="footer-trade-link">Trade partnership</Link></li>
          <li><Link to="/enquiry" className="hover:text-bone" data-testid="footer-enquiry-link">Request pricing</Link></li>
        </ul>
      </div>
      <div className="md:col-span-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Pricing & trade enquiries</p>
        <a href={`mailto:${CONTACT_EMAIL}`} data-testid="footer-email-link" className="mt-5 inline-flex items-center gap-3 font-display text-2xl text-bone transition-colors hover:text-gold">
          <Mail className="h-5 w-5 text-gold" /> {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm text-mist">Prices are not listed online — contact us for retail, bulk and trade pricing.</p>
      </div>
    </div>
    <div className="border-t border-line">
      <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-mist lg:px-8">
        © {new Date().getFullYear()} Mindmaze. Philips and the Philips shield emblem are trademarks of Koninklijke Philips N.V., used under licence by the product manufacturer.
      </p>
    </div>
  </footer>
);
