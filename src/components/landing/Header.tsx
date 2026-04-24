const navItems = ["About us", "Services", "Use Cases", "Pricing", "Blog"];

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2 L20 12 L30 16 L20 20 L16 30 L12 20 L2 16 L12 12 Z" fill="currentColor" />
    </svg>
    <span className="text-2xl font-medium tracking-tight">Positivus</span>
  </a>
);

const Header = () => {
  return (
    <header className="container py-8">
      <nav className="flex items-center justify-between gap-6">
        <Logo />
        <ul className="hidden lg:flex items-center gap-10 text-base">
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
        <a
          href="#"
          className="hidden md:inline-flex items-center px-7 py-4 rounded-2xl border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Request a quote
        </a>
      </nav>
    </header>
  );
};

export default Header;
