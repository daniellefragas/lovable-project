import { motion } from "framer-motion";
import linear from "@/assets/logos/linear.svg";
import asimov from "@/assets/logos/asimov.svg";
import antimetal from "@/assets/logos/antimetal.svg";
import isoMeet from "@/assets/logos/iso_meet.svg";
import frameIo from "@/assets/logos/frame_io.svg";

const logos = [
  { src: linear, alt: "Linear" },
  { src: asimov, alt: "Asimov" },
  { src: antimetal, alt: "Antimetal" },
  { src: isoMeet, alt: "ISO Meet" },
  { src: frameIo, alt: "Frame.io" },
];

// Duplicate the logos so the marquee can loop seamlessly
const marqueeLogos = [...logos, ...logos];

export const LogoStrip = () => {
  return (
    <section className="relative py-16 px-4 border-t border-white/5 bg-py-dark overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] uppercase tracking-[0.25em] text-white/35 font-mono mb-12"
        >
          Tecnologias usadas em empresas como
        </motion.p>

        {/* Marquee viewport */}
        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="flex w-max animate-marquee gap-x-16 md:gap-x-24">
            {marqueeLogos.map((l, i) => (
              <img
                key={`${l.alt}-${i}`}
                src={l.src}
                alt={l.alt}
                className="h-5 md:h-6 w-auto opacity-40 hover:opacity-90 transition-opacity duration-300 shrink-0"
                style={{ filter: "invert(1) brightness(1.2)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
