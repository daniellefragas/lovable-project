import ill1 from "@/assets/illustration-1.svg";
import ill2 from "@/assets/illustration-2.svg";
import ill3 from "@/assets/illustration-3.svg";
import ill4 from "@/assets/illustration-4.svg";
import ill5 from "@/assets/illustration-5.svg";
import ill6 from "@/assets/illustration-6.svg";
import ArrowIcon from "./ArrowIcon";

type Variant = "light" | "green" | "dark";

interface Service {
  title: string[];
  variant: Variant;
  image: string;
  arrowCircle: "dark" | "light";
  arrowColor: string;
}

const services: Service[] = [
  { title: ["Search engine", "optimization"], variant: "light", image: ill1, arrowCircle: "dark", arrowColor: "#B9FF66" },
  { title: ["Pay-per-click", "advertising"], variant: "green", image: ill2, arrowCircle: "dark", arrowColor: "#B9FF66" },
  { title: ["Social Media", "Marketing"], variant: "dark", image: ill3, arrowCircle: "light", arrowColor: "#000000" },
  { title: ["Email", "Marketing"], variant: "light", image: ill4, arrowCircle: "dark", arrowColor: "#B9FF66" },
  { title: ["Content", "Creation"], variant: "green", image: ill5, arrowCircle: "dark", arrowColor: "#B9FF66" },
  { title: ["Analytics and", "Tracking"], variant: "dark", image: ill6, arrowCircle: "light", arrowColor: "#000000" },
];

const variantStyles: Record<Variant, { card: string; chip: string; learn: string }> = {
  light: {
    card: "bg-brand-light",
    chip: "bg-accent text-accent-foreground",
    learn: "text-foreground",
  },
  green: {
    card: "bg-accent",
    chip: "bg-background text-foreground",
    learn: "text-foreground",
  },
  dark: {
    card: "bg-foreground text-background",
    chip: "bg-accent text-accent-foreground",
    learn: "text-background",
  },
};

const Services = () => {
  return (
    <section className="container grid md:grid-cols-2 gap-8 md:gap-10 pb-10">
      {services.map((s, i) => {
        const v = variantStyles[s.variant];
        const arrowCircle = s.arrowCircle === "dark" ? "bg-foreground" : "bg-background";
        return (
          <article
            key={i}
            className={`${v.card} rounded-[2.5rem] border border-foreground shadow-card p-6 sm:p-8 md:p-12 flex items-center justify-between gap-4 transition-transform hover:-translate-y-1`}
          >
            <div className="flex flex-col justify-between gap-8 md:gap-12 min-h-[200px] md:min-h-[240px]">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight flex flex-col gap-0">
                {s.title.map((line) => (
                  <span key={line} className={`${v.chip} px-2 rounded-[7px] inline-block leading-snug w-fit`}>
                    {line}
                  </span>
                ))}
              </h3>
              <a href="#" className={`inline-flex items-center gap-3 ${v.learn} group`}>
                <span className={`${arrowCircle} rounded-full w-10 h-10 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <ArrowIcon color={s.arrowColor} />
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
              className="w-24 sm:w-32 md:w-52 h-auto shrink-0"
            />
          </article>
        );
      })}
    </section>
  );
};

export default Services;
