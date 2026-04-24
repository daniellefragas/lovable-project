import { useState } from "react";
import logo from "@/assets/positivus-logo.svg";

const navItems = ["About us", "Services", "Use Cases", "Pricing", "Blog"];

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <img src={logo} alt="Positivus" width={36} height={36} className="w-7 h-7 sm:w-9 sm:h-9" />
    <span className="text-xl sm:text-[30px] font-medium tracking-tight leading-none">Positivus</span>
  </a>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="container py-6 md:py-8">
      <nav className="relative flex items-center justify-between gap-6">
        <Logo />

        <div className="flex items-center gap-10">
          <ul className="hidden lg:flex items-center gap-8 text-base">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-accent-foreground hover:underline underline-offset-4 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <a href="#" className="hidden md:inline-flex btn-outline-cta !w-auto">
            Request a quote
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground text-foreground transition hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute right-0 top-full z-50 mt-3 w-full max-w-xs rounded-3xl border border-input bg-background p-4 shadow-lg lg:hidden">
            <ul className="flex flex-col gap-3 text-base">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-foreground hover:bg-muted transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
