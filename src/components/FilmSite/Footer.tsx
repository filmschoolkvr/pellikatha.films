import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-16 border-t border-[color:var(--cream)]/10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <Logo size={36} />

        <div className="flex items-center gap-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cinema-ease text-[11px] tracking-luxe uppercase text-[color:var(--cream)]/70 hover:text-[color:var(--gold)] transition-colors duration-500"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@pellikatha.films"
            className="cinema-ease text-[11px] tracking-luxe uppercase text-[color:var(--cream)]/70 hover:text-[color:var(--gold)] transition-colors duration-500"
          >
            Contact
          </a>
        </div>

        <p className="text-[10px] tracking-luxe uppercase text-[color:var(--cream)]/40">
          © MMXXVI · pellikatha.films
        </p>
      </div>
    </footer>
  );
}
