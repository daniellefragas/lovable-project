import amazon from "@/assets/logo-amazon.svg";
import dribbble from "@/assets/logo-dribbble.svg";
import hubspot from "@/assets/logo-hubspot.svg";
import notion from "@/assets/logo-notion.svg";
import netflix from "@/assets/logo-netflix.svg";
import zoom from "@/assets/logo-zoom.svg";

const logos = [
  { src: amazon, alt: "Amazon" },
  { src: dribbble, alt: "Dribbble" },
  { src: hubspot, alt: "HubSpot" },
  { src: notion, alt: "Notion" },
  { src: netflix, alt: "Netflix" },
  { src: zoom, alt: "Zoom" },
];

const Logos = () => {
  return (
    <section className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-8">
        {logos.map((l) => (
          <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" className="h-10 md:h-12 w-auto" />
        ))}
      </div>
    </section>
  );
};

export default Logos;
