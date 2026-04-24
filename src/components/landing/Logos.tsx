const logos = ["amazon", "dribbble", "HubSpot", "Notion", "NETFLIX", "zoom"];

const Logos = () => {
  return (
    <section className="container py-10">
      <div className="flex flex-wrap items-center justify-between gap-8 grayscale opacity-70">
        {logos.map((name) => (
          <span key={name} className="text-2xl md:text-3xl font-medium text-muted-foreground">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Logos;
