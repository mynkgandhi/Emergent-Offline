import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export const RevealLines = ({ lines, className = "", delay = 0.15, as: Tag = "h1", testid }) => (
  <Tag className={className} data-testid={testid}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Reveal = ({ children, className = "", delay = 0, y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.9, ease, delay }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, className = "" }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.24em] text-gold ${className}`}>{children}</p>
);
