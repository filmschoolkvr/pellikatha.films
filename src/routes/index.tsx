import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/FilmSite/Hero";
import { WhyUs } from "@/components/FilmSite/WhyUs";
import { Process } from "@/components/FilmSite/Process";
import { BookingForm } from "@/components/FilmSite/BookingForm";
import { FinalCta } from "@/components/FilmSite/FinalCta";
import { Footer } from "@/components/FilmSite/Footer";
import { SectionDivider } from "@/components/FilmSite/SectionDivider";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "pellikatha.films — Every Pelli, a Katha. Every Katha, a Film." },
      {
        name: "description",
        content:
          "A luxury wedding film studio. Cinematic, emotional, timeless — we craft feature-worthy films of your wedding story.",
      },
      { property: "og:title", content: "pellikatha.films" },
      {
        property: "og:description",
        content: "Every Pelli, a Katha. Every Katha, a Film. Cinematic wedding films, crafted like features.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-[color:var(--ink)] text-[color:var(--cream)] film-grain overflow-x-hidden">
      <Hero />
      <SectionDivider type="garland" className="opacity-60" />
      
      <WhyUs />
      <SectionDivider type="line" className="my-12" />
      
      <Process />
      <SectionDivider type="arch" className="opacity-40" />
      
      <BookingForm />
      <SectionDivider type="line" className="my-24 opacity-20" />
      
      <FinalCta />
      <Footer />
    </main>
  );
}
