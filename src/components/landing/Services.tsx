import ill1 from "@/assets/illustration-1.svg";
import ill2 from "@/assets/illustration-2.svg";
import ill3 from "@/assets/illustration-3.svg";

const ArrowIcon = ({ color }: { color: string }) => (
  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 13.6956C0.0325611 14.1098 -0.213252 15.0272 0.200962 15.7446C0.615175 16.4621 1.53256 16.7079 2.25 16.2937L0.75 13.6956ZM20.2694 5.38286C20.4838 4.58266 20.0089 3.76015 19.2087 3.54574L6.16874 0.051683C5.36854 -0.16273 4.54603 0.312144 4.33162 1.11234C4.11721 1.91254 4.59208 2.73505 5.39228 2.94946L16.9834 6.05529L13.8776 17.6464C13.6631 18.4466 14.138 19.2691 14.9382 19.4835C15.7384 19.6979 16.5609 19.2231 16.7753 18.4229L20.2694 5.38286ZM2.25 16.2937L19.5705 6.29367L18.0705 3.69559L0.75 13.6956L2.25 16.2937Z" fill={color}/>
  </svg>
);

type Variant = "light" | "green" | "dark";

interface Service {
  title: string[];
  variant: Variant;
  image: string;
}

const services: Service[] = [
  { title: ["Search engine", "optimization"], variant: "light", image: ill1 },
  { title: ["Pay-per-click", "advertising"], variant: "green", image: ill2 },
  { title: ["Social Media", "Marketing"], variant: "dark", image: ill3 },
  { title: ["Email", "Marketing"], variant: "light", image: ill1 },
  { title: ["Content", "Creation"], variant: "green", image: ill2 },
  { title: ["Analytics and", "Tracking"], variant: "dark", image: ill3 },
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
    <section className="container grid md:grid-cols-2 gap-10 pb-10">
      {services.map((s, i) => {
        const v = variantStyles[s.variant];
        // Cards 1-4 (index 0-3): green arrow on dark circle
        // Cards 5-6 (index 4-5): black arrow on white circle
        const greenArrow = i < 4;
        const arrowCircle = greenArrow ? "bg-foreground" : "bg-background";
        const arrowColor = greenArrow ? "#B9FF66" : "#000000";
        return (
          <article
            key={i}
            className={`${v.card} rounded-[2.5rem] border border-foreground shadow-card p-8 md:p-12 flex items-center justify-between gap-4 transition-transform hover:-translate-y-1`}
          >
            <div className="flex flex-col justify-between gap-12 min-h-[240px]">
              <h3 className="text-2xl md:text-3xl font-medium leading-tight flex flex-col gap-0">
                {s.title.map((line) => (
                  <span key={line} className={`${v.chip} px-2 rounded-[7px] inline-block leading-snug w-fit`}>
                    {line}
                  </span>
                ))}
              </h3>
              <a href="#" className={`inline-flex items-center gap-3 ${v.learn} group`}>
                <span className={`${arrowCircle} rounded-full w-10 h-10 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                  <ArrowIcon color={arrowColor} />
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
