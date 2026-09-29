import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import Integrations from "@/components/sections/Integrations";
import Solutions from "@/components/sections/Solutions";
import HowItWorks from "@/components/sections/HowItWorks";
import Feature from "@/components/sections/Feature";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import DemoModal from "@/components/ui/DemoModal";

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Solutions />
        <Integrations />
        <HowItWorks />
        <Feature />
        <Pricing />
        <Testimonials />
        <Faq />
      </Container>
      <DemoModal />
    </main>
  );
}
