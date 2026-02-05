import { Navbar } from "@/components/shared";
import {
  Hero,
  SocialProof,
  Services,
  HowItWorks,
  WhyUs,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <HowItWorks />
        <WhyUs />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
