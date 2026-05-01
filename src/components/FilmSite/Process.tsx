import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Connect", body: "A quiet conversation — about you, your families, your vision." },
  { n: "02", title: "Plan", body: "We map every scene, every light, every moment worth remembering." },
  { n: "03", title: "Capture", body: "Unobtrusive, patient, cinematic. We document — never direct." },
  { n: "04", title: "Deliver Film", body: "A feature-worthy film, graded and scored, timeless in its finish." },
];

export function Process() {
  return (
    <section id="process" className="relative px-6 md:px-12 py-16 md:py-20 bg-[color:var(--card)]/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-24 md:mb-32">
          <Reveal>
            <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-6">
              — The Process
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[color:var(--cream)] leading-[1.05]">
              Four acts. One story.
            </h2>
          </Reveal>
        </div>

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          <div className="absolute top-[22px] left-[6%] right-[6%] h-px overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-transparent via-[color:var(--gold)]/70 to-transparent"
            />
          </div>

          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-2"
              >
                <div className="h-11 w-11 rounded-full border border-[color:var(--gold)]/60 bg-[color:var(--ink)] flex items-center justify-center">
                  <span className="text-[10px] tracking-luxe text-[color:var(--gold)]">{s.n}</span>
                </div>
                <h3 className="mt-8 font-serif italic text-2xl text-[color:var(--cream)] font-light">
                  {s.title}
                </h3>
                <p className="mt-4 text-[color:var(--cream)]/60 text-sm leading-relaxed font-light max-w-[220px]">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-[21px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent" />
          <div className="space-y-14">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15}>
                <div className="relative">
                  <div className="absolute -left-10 top-0 h-11 w-11 rounded-full border border-[color:var(--gold)]/60 bg-[color:var(--ink)] flex items-center justify-center">
                    <span className="text-[10px] tracking-luxe text-[color:var(--gold)]">{s.n}</span>
                  </div>
                  <h3 className="font-serif italic text-2xl text-[color:var(--cream)] font-light">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[color:var(--cream)]/60 text-sm leading-relaxed font-light">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
