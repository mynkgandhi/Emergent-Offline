import { ScanFace, Cctv, Sun, Smartphone, BatteryCharging, Award } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/site/Reveal";

const POINTS = [
  { icon: ScanFace, title: "Biometrics that know your family", text: "3D face, palm vein and fingerprint recognition across the range — fast, touch-free entry for every age." },
  { icon: Cctv, title: "A door that watches back", text: "Triple-camera monitoring, video intercom, night vision and instant tamper alerts on premium models." },
  { icon: Sun, title: "Built for Australian doors", text: "Weather-resistant designs, IP65 protection on the DDL801 and fit options for timber, aluminium and narrow frames." },
  { icon: Smartphone, title: "One app for every lock", text: "Philips Home Access: remote unlock, activity logs, temporary codes for guests and trades." },
  { icon: BatteryCharging, title: "Never locked out", text: "Low-battery warnings, emergency USB / magnetic power and mechanical backup keys." },
  { icon: Award, title: "Design that earns its place", text: "Clean, architectural hardware — the DDL801 is a Red Dot Award 2025 winner." },
];

export const WhyPhilips = () => (
  <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8" data-testid="why-philips-section">
    <div className="grid gap-12 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <Eyebrow>Why Philips</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-bone sm:text-5xl">Security you never have to think about.</h2>
        <p className="mt-6 text-base leading-relaxed text-mist">Philips smart locks pair trusted engineering with access methods that fit real life — so your home stays safe, and getting in stays easy.</p>
      </Reveal>
      <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
        {POINTS.map((pt, i) => (
          <Reveal key={pt.title} delay={i * 0.05} className="h-full">
            <div className="group flex h-full flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-surface" data-testid={`why-philips-point-${i}`}>
              <pt.icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
              <h3 className="font-display text-xl font-semibold tracking-tight text-bone">{pt.title}</h3>
              <p className="text-sm leading-relaxed text-mist">{pt.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
