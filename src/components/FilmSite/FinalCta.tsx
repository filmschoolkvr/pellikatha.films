import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="contact" className="relative px-6 md:px-12 py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-10">
            — Begin
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif italic font-light text-[color:var(--cream)] text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
            Your story deserves to be
            <br />
            remembered like a film.
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mx-auto my-14 h-px w-24 hairline-gold" />
        </Reveal>
        <Reveal delay={0.55}>
          <a
            href="mailto:hello@pellikatha.films"
            className="gold-pulse gold-glow cinema-ease inline-flex items-center justify-center border border-[color:var(--gold)] bg-[color:var(--gold)]/5 text-[color:var(--gold)] px-12 py-4 text-xs tracking-luxe uppercase hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)]"
          >
            Start Your Story
          </a>
        </Reveal>
        <Reveal delay={0.75}>
          <p className="mt-10 text-[11px] tracking-editorial text-[color:var(--cream)]/50">
            A limited number of films, each year. By invitation & inquiry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
