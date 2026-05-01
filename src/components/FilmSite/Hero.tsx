import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-bride.jpg";
import { Logo } from "./Logo";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Cinematic background — slow scale */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/logoanimation.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[color:var(--ink)]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/70 via-transparent to-[color:var(--ink)]" />


      {/* Bottom buttons content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 text-center pb-24">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#why-us"
            className="gold-glow cinema-ease inline-flex items-center justify-center border border-[color:var(--gold)]/70 text-[color:var(--gold)] px-8 py-3.5 text-xs tracking-luxe uppercase hover:text-[color:var(--cream)]"
          >
            The Difference
          </a>
          <a
            href="#contact"
            className="gold-glow cinema-ease inline-flex items-center justify-center border border-[color:var(--cream)]/20 text-[color:var(--cream)]/80 px-8 py-3.5 text-xs tracking-luxe uppercase hover:border-[color:var(--cream)]/50 hover:text-[color:var(--cream)]"
          >
            Book Your Film
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-luxe text-[color:var(--cream)]/50 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[color:var(--gold)]/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
