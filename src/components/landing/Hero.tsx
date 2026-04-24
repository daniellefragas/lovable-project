import heroImg from "@/assets/hero-megaphone.png";

const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
      <div className="space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight">
          Navigating the digital landscape for success
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.
        </p>
        <a
          href="#"
          className="inline-flex items-center px-9 py-5 rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition-colors text-base"
        >
          Book a consultation
        </a>
      </div>
      <div className="flex justify-center lg:justify-end">
        <img src={heroImg} alt="Megaphone illustration with floating social media icons" width={600} height={520} className="w-full max-w-[600px] h-auto" />
      </div>
    </section>
  );
};

export default Hero;
