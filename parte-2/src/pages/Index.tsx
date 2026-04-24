import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";

const Index = () => {
  return (
    <main className="min-h-screen bg-py-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoStrip />
    </main>
  );
};

export default Index;
