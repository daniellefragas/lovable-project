import ctaImg from "@/assets/cta-illustration.svg";

const CTA = () => {
  return (
    <section className="container py-10 md:py-12">
      <div className="bg-brand-light rounded-[2.5rem] p-6 sm:p-8 md:p-16 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="space-y-5 md:space-y-6">
          <h2 className="text-section-title">
            Let's make things happen
          </h2>
          <p className="text-hero-sub text-foreground max-w-md">
            Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.
          </p>
          <a href="#" className="btn-primary-cta">
            Get your free proposal
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src={ctaImg} alt="Abstract decorative shapes" loading="lazy" width={494} height={395} className="w-full max-w-[494px] h-auto" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
