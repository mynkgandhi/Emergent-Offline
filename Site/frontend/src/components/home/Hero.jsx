import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ScanFace } from "lucide-react";
import { RevealLines, Eyebrow } from "@/components/site/Reveal";
import { HeroScene, useScanPhase } from "@/components/home/HeroScene";

const ScanCard = ({ rx, ry, phase }) => (
  <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="w-[230px] rounded-2xl border border-white/15 bg-ink/60 p-4 backdrop-blur-xl sm:w-[280px] sm:p-5" data-testid="hero-scan-card">
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">FaceKey 3D · DDL902</span>
      <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
    </div>
    <div className="relative mx-auto my-4 grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
      <span className="scan-corners absolute inset-0" />
      <ScanFace className="h-10 w-10 text-bone" strokeWidth={1.2} />
      <span className={`scan-line absolute inset-x-2 h-px bg-gold shadow-[0_0_12px_#D9B46A] transition-opacity duration-500 ${phase ? "opacity-0" : "opacity-100"}`} />
    </div>
    <motion.div key={phase} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} data-testid="hero-scan-status">
      <p className="font-display text-base text-bone sm:text-lg">{phase ? "Face recognised." : "Scanning face…"}</p>
      <p className={`text-xs ${phase ? "text-emerald-300" : "text-mist"}`}>{phase ? "Door unlocked — just push to enter." : "FaceKey 3D sensing in progress"}</p>
    </motion.div>
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });
  const phase = useScanPhase();

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden bg-ink" data-testid="hero-section">
      <HeroScene phase={phase} style={{ y, scale }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/0 lg:bg-gradient-to-r lg:from-ink lg:via-ink/75 lg:to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 lg:justify-center lg:px-8 lg:pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Eyebrow>Mindmaze · Largest Trade Partner for Philips Smart Locks</Eyebrow>
        </motion.div>
        <RevealLines
          testid="hero-title"
          className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.03em] text-bone sm:text-6xl lg:text-7xl"
          lines={["Safe, secure access.", <span key="b">Easy entry for you</span>, <span key="c">& your <em className="font-light italic text-gold">family.</em></span>]}
        />
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9 }} className="mt-7 max-w-xl text-base leading-relaxed text-bone/80 sm:text-lg">
          Arms full of groceries? The Philips DDL902 recognises your face, unlocks on approach, and you simply push to enter. Philips smart locks keep every member of your household secure — with access that feels effortless.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }} className="mt-10 flex flex-wrap gap-3">
          <Link to="/enquiry?type=trade" data-testid="hero-trade-pricing-button" className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-medium text-ink transition-colors hover:bg-gold-bright">
            Request for Trade Pricing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/catalogue" data-testid="hero-explore-button" className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-bone backdrop-blur transition-colors hover:border-bone">
            Explore the range
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-ink/60 py-2 pl-2 pr-4 backdrop-blur-xl lg:hidden" data-testid="hero-scan-chip">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink"><ScanFace className="h-4 w-4" /></span>
          <span className="text-xs text-bone" data-testid="hero-scan-chip-status">{phase ? "Face recognised · Door unlocked" : "Scanning face…"}</span>
        </motion.div>
      </div>

      <div className="absolute bottom-24 right-16 hidden lg:block">
        <ScanCard rx={rx} ry={ry} phase={phase} />
      </div>
    </section>
  );
};
