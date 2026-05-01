import { motion } from "framer-motion";
import film1 from "@/assets/film-1.jpg";
import film2 from "@/assets/film-2.jpg";
import film3 from "@/assets/film-3.jpg";
import film4 from "@/assets/film-4.jpg";
import { Reveal } from "./Reveal";

const films = [
  { img: film1, couple: "Ananya & Rohan", location: "Udaipur, Rajasthan", year: "MMXXIV" },
  { img: film2, couple: "Priya & Arjun", location: "Chennai, Tamil Nadu", year: "MMXXIV" },
  { img: film3, couple: "Meera & Karthik", location: "Hyderabad, Telangana", year: "MMXXIV" },
  { img: film4, couple: "Saanvi & Vikram", location: "Goa, India", year: "MMXXV" },
];

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[color:var(--ink)]">
      <path d="M8 5 L19 12 L8 19 Z" fill="currentColor" />
    </svg>
  );
}

export function Films() {
  return (
    <section id="films" className="relative py-16 md:py-20">
      <div className="px-6 md:px-12 mb-16 md:mb-24">
        <Reveal>
          <p className="text-[10px] tracking-luxe text-[color:var(--gold)] uppercase mb-6">
            — Featured Films
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[color:var(--cream)] max-w-3xl leading-[1.05]">
            Stories, unfolding frame by frame.
          </h2>
        </Reveal>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 md:gap-10 px-6 md:px-12 pb-4">
          {films.map((f, i) => (
            <motion.a
              key={f.couple}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex-shrink-0 w-[78vw] sm:w-[52vw] md:w-[38vw] lg:w-[28vw] aspect-[3/4] overflow-hidden"
            >
              <img
                src={f.img}
                alt={`${f.couple} — wedding film in ${f.location}`}
                loading="lazy"
                width={1280}
                height={1600}
                className="h-full w-full object-cover transition-transform duration-[1400ms] cinema-ease group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-[color:var(--ink)]/20 transition-colors duration-700 group-hover:bg-[color:var(--ink)]/55" />

              {/* Play icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--gold)]">
                  <PlayIcon />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-[color:var(--cream)] font-light leading-tight">
                      {f.couple}
                    </h3>
                    <p className="mt-2 text-[10px] tracking-luxe text-[color:var(--cream)]/70 uppercase">
                      {f.location}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-luxe text-[color:var(--gold)]">
                    {f.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="flex-shrink-0 w-6 md:w-12" />
        </div>
      </div>
    </section>
  );
}
//comment
