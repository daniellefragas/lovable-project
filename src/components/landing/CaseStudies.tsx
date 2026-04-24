import ArrowIcon from "./ArrowIcon";

const cases = [
  "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
  "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
  "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
];

const CaseStudies = () => {
  return (
    <section className="container pb-16">
      <div className="bg-foreground text-background rounded-[2.5rem] p-8 md:p-16 grid md:grid-cols-3 gap-8 md:divide-x md:divide-background/30">
        {cases.map((text, i) => (
          <div key={i} className="md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-6">
            <p className="text-section-desc leading-relaxed">{text}</p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-accent hover:underline underline-offset-4 text-section-desc"
            >
              Learn more <ArrowIcon color="#B9FF66" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
