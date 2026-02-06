import {
  CTA,
  FAQ,
  Footer,
  Hero,
  Destinations,
  Services,
  SocialProof,
  ExperienceShowcase,
  CoolPlaces,
  Gallery,
  Testimonials,
  WhyUs,
  HowItWorks,
} from "@/components/landing";
import { Navbar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />

      <Services />
      <CoolPlaces />
      <Destinations />
      <ExperienceShowcase />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <WhyUs />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
