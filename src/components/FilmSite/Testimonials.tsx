import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const quotes = [
  {
    q: "They didn't film our wedding. They remembered it for us — every silence, every glance. The film feels like a memory we can step back into.",
    name: "Ananya & Rohan",
    loc: "Udaipur",
  },
  {
    q: "We expected a wedding video. We received a film. Our parents cried. We cried. Years later, it still breaks us, in the most beautiful way.",
    name: "Priya & Arjun",
    loc: "Chennai",
  },
  {
    q: "Every frame feels intentional. Every edit feels earned. pellikatha understood our story before we did.",
    name: "Meera & Karthik",
    loc: "Hyderabad",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-12">
            — In Their Words
          </p>
        </Reveal>

        <div className="relative min-h-[280px] md:min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[color:var(--cream)] font-light leading-[1.4]">
                "{quotes[i].q}"
              </p>
              <div className="mt-10 h-px w-12 bg-[color:var(--gold)]/60" />
              <p className="mt-6 text-[11px] tracking-luxe text-[color:var(--gold)] uppercase">
                {quotes[i].name}
              </p>
              <p className="mt-2 text-[10px] tracking-luxe text-[color:var(--cream)]/50 uppercase">
                {quotes[i].loc}
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className="group h-px w-8 overflow-hidden bg-[color:var(--cream)]/15"
            >
              <div
                className={`h-full cinema-ease transition-all duration-700 ${
                  idx === i ? "w-full bg-[color:var(--gold)]" : "w-0 bg-[color:var(--gold)]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
