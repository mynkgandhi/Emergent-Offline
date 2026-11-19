export const Logo = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <rect x="1" y="1" width="62" height="62" rx="16" fill="#11161E" stroke="#D9B46A" strokeOpacity=".45" strokeWidth="1.5" />
    <rect x="22" y="10" width="20" height="44" rx="7" fill="none" stroke="#F3F1EC" strokeWidth="3" />
    <path d="M26 21 Q32 15 38 21" fill="none" stroke="#D9B46A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="30" r="3.2" fill="#D9B46A" />
    <rect x="30.2" y="38" width="3.6" height="10" rx="1.8" fill="#F3F1EC" />
  </svg>
);

export const Wordmark = () => (
  <span className="flex items-center gap-3">
    <Logo />
    <span className="leading-none">
      <span className="block font-display text-[15px] font-semibold tracking-tight text-bone">Philips Smart Locks Hub</span>
      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-gold">by Mindmaze</span>
    </span>
  </span>
);
