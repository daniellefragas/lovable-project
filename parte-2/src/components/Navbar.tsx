import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/pythonlab-logo.svg";

const links = [
  { label: "Início", href: "#" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Projetos", href: "#projetos" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Sobre", href: "#sobre" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-py-dark/60 border-b border-white/5"
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="PythonLab"
            width={28}
            height={28}
            className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="font-display font-semibold text-base tracking-tight">
            PythonLab
          </span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-white/65 hover:text-white transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-py-teal group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-white/85 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200">
            Entrar
          </button>
          <button className="px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-py-dark bg-white rounded-full hover:bg-py-teal hover:shadow-[0_0_24px_hsl(var(--py-teal)/0.5)] transition-all duration-200 hover:scale-[1.03]">
            Quero começar
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-py-dark/95 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block font-mono text-xs uppercase tracking-[0.15em] text-white/80 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
              <button className="px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-white rounded-full border border-white/15">
                Entrar
              </button>
              <button className="px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-py-dark bg-white rounded-full">
                Quero começar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
