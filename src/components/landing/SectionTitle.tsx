interface Props {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: Props) => {
  return (
    <div className="container flex flex-col md:flex-row md:items-center gap-6 py-10">
      <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
        <span className="highlight-green">{title}</span>
      </h2>
      <p className="text-base md:text-lg text-foreground max-w-md">{description}</p>
    </div>
  );
};

export default SectionTitle;
