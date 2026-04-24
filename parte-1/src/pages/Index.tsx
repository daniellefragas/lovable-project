import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import SectionTitle from "@/components/landing/SectionTitle";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";
import CaseStudies from "@/components/landing/CaseStudies";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Logos />
        <SectionTitle
          title="Services"
          description="At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:"
        />
        <Services />
        <CTA />
        <SectionTitle
          title="Case Studies"
          description="Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies"
        />
        <CaseStudies />
      </main>
    </div>
  );
};

export default Index;
