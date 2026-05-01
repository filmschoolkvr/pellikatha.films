import storyImg from "@/assets/story-couple.jpg";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section className="relative px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 md:order-1">
          <Reveal delay={0}>
            <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-8">
              — The Studio
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-light leading-[1.1] text-[color:var(--cream)]">
              We don't just film weddings.
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-light leading-[1.1] text-[color:var(--gold)] mt-2">
              We craft stories that live forever.
            </h2>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="my-10 h-px w-20 hairline-gold" />
          </Reveal>
          <Reveal delay={0.8}>
            <p className="text-[color:var(--cream)]/75 text-base md:text-lg leading-relaxed max-w-lg font-light">
              At pellikatha.films, every moment is captured with intention,
              emotion, and cinematic depth — the quiet glances, the stolen
              laughter, the ceremony that becomes memory.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.45} className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={storyImg}
              alt="Bride smiling, captured in cinematic light"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <span className="text-[10px] tracking-luxe text-[color:var(--cream)] uppercase">
                Scene 01
              </span>
              <span className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase">
                35mm · film
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
