import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const base = process.env.PUBLIC_URL || "";
const IW = 1264;
const IH = 848;
const CAM = [1040, 322];
const FACE = { x1: 742, x2: 806, y1: 205, y2: 305 };
const BEAM = `${CAM[0]},${CAM[1] - 7} ${CAM[0]},${CAM[1] + 7} ${FACE.x2 - 6},${FACE.y2 - 10} ${FACE.x2 - 6},${FACE.y1 + 10}`;

const useCoverBox = (ref) => {
  const [box, setBox] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s = Math.max(W / IW, H / IH);
      const w = IW * s;
      const h = IH * s;
      const px = window.innerWidth >= 1024 ? 0.7 : 0.84;
      setBox({ w, h, left: (W - w) * px, top: (H - h) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return box;
};

const Corner = ({ d, on }) => (
  <motion.path d={d} fill="none" stroke="#D9B46A" strokeWidth="2.5" strokeLinecap="round" animate={{ opacity: on ? 1 : 0, pathLength: on ? 1 : 0 }} transition={{ duration: 0.5 }} />
);

const Overlay = ({ phase }) => {
  const ok = phase === 1;
  const { x1, x2, y1, y2 } = FACE;
  const c = 12;
  return (
    <svg viewBox={`0 0 ${IW} ${IH}`} className="pointer-events-none absolute inset-0 h-full w-full" data-testid="hero-scan-overlay" aria-hidden="true">
      <defs>
        <linearGradient id="beamG" x1={CAM[0]} y1={CAM[1]} x2={x2} y2={(y1 + y2) / 2} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FF3FF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#3FD8F0" stopOpacity="0.08" />
        </linearGradient>
        <filter id="blurB"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <motion.polygon points={BEAM} fill="url(#beamG)" filter="url(#blurB)" style={{ mixBlendMode: "screen" }}
        animate={{ opacity: ok ? [0.25, 0.1] : [0.08, 0.7, 0.08] }} transition={{ duration: ok ? 1.2 : 2.2, repeat: ok ? 0 : Infinity, ease: "easeInOut" }} />
      {!ok && (
        <motion.line x1={x1 + 4} x2={x2 - 4} stroke="#9FF6FF" strokeWidth="2" style={{ filter: "drop-shadow(0 0 6px #7FF3FF)" }}
          initial={{ y1: y1 + 8, y2: y1 + 8 }} animate={{ y1: [y1 + 8, y2 - 8, y1 + 8], y2: [y1 + 8, y2 - 8, y1 + 8], opacity: [0.2, 0.9, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
      )}
      <Corner on={ok} d={`M${x1} ${y1 + c} V${y1} H${x1 + c}`} />
      <Corner on={ok} d={`M${x2 - c} ${y1} H${x2} V${y1 + c}`} />
      <Corner on={ok} d={`M${x1} ${y2 - c} V${y2} H${x1 + c}`} />
      <Corner on={ok} d={`M${x2 - c} ${y2} H${x2} V${y2 - c}`} />
      <motion.circle cx={CAM[0]} cy={CAM[1]} fill={ok ? "#34D399" : "#7FF3FF"} style={{ mixBlendMode: "screen" }}
        animate={{ r: [5, 13, 5], opacity: [0.9, 0.25, 0.9] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.rect x={CAM[0] - 13} y={CAM[1] + 34} width="26" height="3" rx="1.5" fill="#34D399"
        animate={{ opacity: ok ? [0, 1, 0.6] : 0 }} transition={{ duration: 0.8 }} style={{ filter: "drop-shadow(0 0 6px #34D399)" }} />
    </svg>
  );
};

export const HeroScene = ({ phase, style }) => {
  const ref = useRef(null);
  const box = useCoverBox(ref);
  return (
    <motion.div ref={ref} style={style} className="absolute inset-0">
      {box ? (
        <div className="absolute" style={{ width: box.w, height: box.h, left: box.left, top: box.top }}>
          <img src={`${base}/hero-family.webp`} alt="Family carrying groceries as the Philips DDL902 recognises the father's face on the closed front door" className="absolute inset-0 h-full w-full" />
          <Overlay phase={phase} />
        </div>
      ) : (
        <img src={`${base}/hero-family.webp`} alt="" className="absolute inset-0 h-full w-full object-cover object-[84%_center] lg:object-[70%_center]" />
      )}
    </motion.div>
  );
};

export const useScanPhase = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 2), phase === 0 ? 4400 : 3000);
    return () => clearInterval(t);
  }, [phase]);
  return phase;
};
