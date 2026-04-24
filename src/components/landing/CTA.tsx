import ctaImg from "@/assets/cta-illustration.png";

const CTA = () => {
  return (
    <section className="container py-12">
      <div className="bg-brand-light rounded-[2.5rem] p-8 md:p-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Let's make things happen
          </h2>
          <p className="text-base text-muted-foreground max-w-md">
            Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-9 py-5 rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Get your free proposal
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src={ctaImg} alt="Abstract decorative shapes" loading="lazy" width={420} height={320} className="w-full max-w-[420px] h-auto" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
