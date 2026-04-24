import logo from "@/assets/positivus-logo.svg";

const navItems = ["About us", "Services", "Use Cases", "Pricing", "Blog"];

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <img src={logo} alt="Positivus" width={36} height={36} />
    <span className="text-[30px] font-medium tracking-tight leading-none">Positivus</span>
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
        <a href="#" className="hidden md:inline-flex btn-outline-cta">
          Request a quote
        </a>
      </nav>
    </header>
  );
};

export default Header;
