/**
 * WhyUs component highlighting the core values and USP of Pelli Katha Films.
 */
// comment 4
import { Reveal } from "./Reveal";

const pillars = [
  {
    title: "Story First",
    body: "Every film begins with your story — the texture of your families, the cadence of your love. We listen before we shoot.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="0.9">
        <path d="M8 10 h24 v20 h-24 z" />
        <path d="M14 16 h12 M14 20 h12 M14 24 h8" />
      </svg>
    ),
  },
  {
    title: "Cinematic Quality",
    body: "Shot on cinema glass, graded like a feature. Anamorphic detail, patient edits, and a grain that lives forever.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="0.9">
        <circle cx="20" cy="20" r="11" />
        <circle cx="20" cy="20" r="4" />
        <path d="M4 20 h6 M30 20 h6 M20 4 v6 M20 30 v6" />
      </svg>
    ),
  },
  {
    title: "Timeless Emotion",
    body: "We don't chase trends. We chase the quiet, uncomposed moments — the ones you'll want to relive in twenty years.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="0.9">
        <path d="M20 32 C 8 24 6 14 13 11 C 17 9 20 13 20 16 C 20 13 23 9 27 11 C 34 14 32 24 20 32 Z" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-6">
            — The Difference
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[color:var(--cream)] leading-[1.05]">
            Why choose pellikatha<span className="text-[color:var(--gold)]">.</span>films
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 h-px w-24 hairline-gold" />
        </Reveal>

        <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-14 md:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.25 + i * 0.2}>
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-[color:var(--gold)]">{p.icon}</div>
                <h3 className="mt-8 font-serif italic text-2xl text-[color:var(--cream)] font-light">
                  {p.title}
                </h3>
                <div className="my-6 h-px w-8 bg-[color:var(--gold)]/50" />
                <p className="text-[color:var(--cream)]/65 text-sm leading-relaxed max-w-xs font-light">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
