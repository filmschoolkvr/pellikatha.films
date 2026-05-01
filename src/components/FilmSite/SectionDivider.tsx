import { motion } from "framer-motion";

interface SectionDividerProps {
  type?: "garland" | "arch" | "line";
  className?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 2.5, bounce: 0 },
      opacity: { duration: 0.5 },
    },
  },
};

export function SectionDivider({ type = "line", className = "" }: SectionDividerProps) {
  return (
    <div className={`relative w-full flex justify-center items-center py-4 md:py-6 ${className}`}>
      {type === "line" && (
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-px hairline-gold" 
        />
      )}

      {type === "garland" && (
        <div className="relative w-full flex flex-col items-center">
          <motion.svg 
            width="400" 
            height="60" 
            viewBox="0 0 400 60" 
            fill="none" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-[color:var(--gold)]/40"
          >
            {/* The main rope */}
            <motion.path 
              variants={draw}
              d="M0 10 C 100 45, 300 45, 400 10" 
              stroke="currentColor" 
              strokeWidth="0.5" 
            />
            {/* Hanging beads/flowers */}
            {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
              <motion.g key={x} initial={{ opacity: 0, y: -5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}>
                <line x1={x} y1={28} x2={x} y2={40} stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
                <circle cx={x} cy="42" r="2" fill="currentColor" opacity="0.6" />
                <circle cx={x} cy="42" r="4" stroke="currentColor" strokeWidth="0.2" />
              </motion.g>
            ))}
          </motion.svg>
        </div>
      )}

      {type === "arch" && (
        <div className="relative flex flex-col items-center">
          <motion.svg 
            width="180" 
            height="80" 
            viewBox="0 0 180 80" 
            fill="none" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-[color:var(--gold)]/30"
          >
            {/* Outer Arch */}
            <motion.path 
              variants={draw}
              d="M10 80 V 40 C 10 10, 170 10, 170 40 V 80" 
              stroke="currentColor" 
              strokeWidth="0.5" 
            />
            {/* Inner Arch Detail */}
            <motion.path 
              variants={draw}
              transition={{ delay: 0.5, duration: 2 }}
              d="M40 80 V 50 C 40 30, 140 30, 140 50 V 80" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2 2"
            />
            {/* Center Motif */}
            <motion.circle 
              cx="90" cy="25" r="3" 
              fill="currentColor" 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            {/* Base Line */}
            <motion.path 
              variants={draw}
              d="M0 80 H 180" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              opacity="0.2"
            />
          </motion.svg>
        </div>
      )}
    </div>
  );
}
