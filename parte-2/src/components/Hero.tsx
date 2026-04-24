import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";
import { AITerminal } from "./AITerminal";

const bullets = [
  "+40 horas de conteúdo direto ao ponto",
  "Projetos com Python + IA desde o módulo 1",
  "Suporte da comunidade com +20.000 alunos",
  "Certificado reconhecido pelo mercado",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-14 items-center">
          {/* LEFT: Content */}
          <div className="text-left">
            {/* Badge pill */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-1 py-1 pl-4 rounded-full border border-py-teal/30 bg-py-dark-2/60 backdrop-blur-sm font-mono text-[10px] tracking-[0.2em] uppercase text-py-teal mb-8"
            >
              <Sparkles className="h-3 w-3" />
              <span>Novo: Curso atualizado 2025</span>
              <span className="ml-2 grid place-items-center h-6 w-6 rounded-full bg-py-teal text-py-dark">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="font-display font-semibold text-white text-[2rem] sm:text-[2.6rem] lg:text-[3.35rem] xl:text-[4rem] leading-[1.04] tracking-tight mb-6"
            >
              Aprenda Python do zero e construa projetos reais com IA.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={2}
              className="font-mono text-white/55 text-sm md:text-base max-w-xl mb-8"
            >
              O curso mais prático do Brasil para quem quer entrar em
              tecnologia sem enrolação.
            </motion.p>

            {/* Bullets */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={3}
              className="flex flex-col gap-3 mb-10"
            >
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 font-mono text-xs md:text-sm text-white/75"
                >
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-py-teal/15 border border-py-teal/30 shrink-0">
                    <Check
                      className="h-3 w-3 text-py-teal"
                      strokeWidth={3}
                    />
                  </span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={4}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <button className="group px-7 py-3.5 rounded-full bg-white text-py-dark font-mono font-semibold text-xs uppercase tracking-[0.15em] hover:bg-py-teal hover:scale-[1.04] transition-all duration-300 shadow-[0_0_0_hsl(var(--py-teal)/0)] hover:shadow-[0_0_40px_hsl(var(--py-teal)/0.5)]">
                Quero começar agora
              </button>
              <button className="px-7 py-3.5 rounded-full bg-py-dark-2/70 backdrop-blur-sm border border-white/10 text-white font-mono font-medium text-xs uppercase tracking-[0.15em] hover:border-white/30 hover:bg-py-dark-2 hover:scale-[1.04] transition-all duration-300">
                Ver o que vou aprender
              </button>
            </motion.div>
          </div>

          {/* RIGHT: AI terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[460px] md:h-[540px] lg:h-[580px] order-first lg:order-last"
          >
            <AITerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
