import { ArrowUpRight } from "lucide-react";
import seo from "@/assets/service-seo.png";
import ppc from "@/assets/service-ppc.png";
import social from "@/assets/service-social.png";
import email from "@/assets/service-email.png";
import content from "@/assets/service-content.png";
import analytics from "@/assets/service-analytics.png";

type Variant = "light" | "green" | "dark";

interface Service {
  title: string[];
  variant: Variant;
  image: string;
}

const services: Service[] = [
  { title: ["Search engine", "optimization"], variant: "light", image: seo },
  { title: ["Pay-per-click", "advertising"], variant: "green", image: ppc },
  { title: ["Social Media", "Marketing"], variant: "dark", image: social },
  { title: ["Email", "Marketing"], variant: "light", image: email },
  { title: ["Content", "Creation"], variant: "green", image: content },
  { title: ["Analytics and", "Tracking"], variant: "dark", image: analytics },
];

const variantStyles: Record<Variant, { card: string; chip: string; learn: string; arrowBg: string; arrowFg: string }> = {
  light: {
    card: "bg-brand-light",
    chip: "bg-accent text-accent-foreground",
    learn: "text-foreground",
    arrowBg: "bg-foreground",
    arrowFg: "text-background",
  },
  green: {
    card: "bg-accent",
    chip: "bg-background text-foreground",
    learn: "text-foreground",
    arrowBg: "bg-foreground",
    arrowFg: "text-background",
  },
  dark: {
    card: "bg-foreground text-background",
    chip: "bg-accent text-accent-foreground",
    learn: "text-background",
    arrowBg: "bg-background",
    arrowFg: "text-foreground",
  },
};

const Services = () => {
  return (
    <section className="container grid md:grid-cols-2 gap-10 pb-10">
      {services.map((s, i) => {
        const v = variantStyles[s.variant];
        return (
          <article
            key={i}
            className={`${v.card} rounded-[2.5rem] border border-foreground shadow-card p-8 md:p-12 flex items-center justify-between gap-4 transition-transform hover:-translate-y-1`}
          >
            <div className="flex flex-col justify-between gap-12 min-h-[240px]">
              <h3 className="text-2xl md:text-3xl font-medium leading-tight">
                {s.title.map((line) => (
                  <span key={line} className={`${v.chip} px-2 rounded-md inline-block leading-snug mb-1`}>
                    {line}
                  </span>
                ))}
              </h3>
              <a href="#" className={`inline-flex items-center gap-3 ${v.learn} group`}>
                <span className={`${v.arrowBg} ${v.arrowFg} rounded-full w-10 h-10 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <ArrowUpRight className="w-5 h-5" />
                </span>
                <span className="text-base">Learn more</span>
              </a>
            </div>
            <img
              src={s.image}
              alt=""
              loading="lazy"
              width={220}
              height={220}
              className="w-32 md:w-52 h-auto shrink-0"
            />
          </article>
        );
      })}
    </section>
  );
};

export default Services;
