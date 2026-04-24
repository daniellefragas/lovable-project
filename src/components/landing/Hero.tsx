import heroImg from "@/assets/hero-illustration.svg";

const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 gap-8 lg:gap-10 items-center py-8 md:py-12 lg:py-20">
      <div className="space-y-6 md:space-y-8 order-1">
        <h1 className="text-hero-title">
          Navigating the digital landscape for success
        </h1>
        <p className="text-hero-sub text-foreground max-w-md hidden md:block">
          Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.
        </p>
        <a href="#" className="btn-primary-cta hidden md:inline-flex">
          Book a consultation
        </a>
      </div>
      <div className="flex justify-center lg:justify-end order-2">
        <img src={heroImg} alt="Megaphone illustration with floating social media icons" width={600} height={515} className="w-full max-w-[600px] h-auto" />
      </div>
      <div className="space-y-6 md:hidden order-3">
        <p className="text-hero-sub text-foreground">
          Our digital marketing agency helps businesses grow and succeed online through a range of services including SEO, PPC, social media marketing, and content creation.
        </p>
        <a href="#" className="btn-primary-cta">
          Book a consultation
        </a>
      </div>
    </section>
  );
};

export default Hero;
