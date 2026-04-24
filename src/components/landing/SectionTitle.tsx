interface Props {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: Props) => {
  return (
    <div className="container flex flex-col md:flex-row md:items-center gap-6 py-10">
      <h2 className="text-section-title shrink-0">
        <span className="highlight-green">{title}</span>
      </h2>
      <p className="text-section-desc text-foreground max-w-xl">{description}</p>
    </div>
  );
};

export default SectionTitle;
