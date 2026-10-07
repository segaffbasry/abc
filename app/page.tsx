import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Preloader } from "@/components/Preloader";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { Management } from "@/components/home/Management";
import { Reviews } from "@/components/home/Reviews";
import { Vision } from "@/components/home/Vision";
import { Work } from "@/components/home/Work";

/* abclondonproperty.co.uk's homepage in a new skin: rioproperty.co.za for the look and layout,
   lagom-development.com for the motion. Every live block is here: the banner, About / Why Choose Us, Building Your
   Vision, the gallery, Expert Construction Management Services, Contact Us, LinkedIn and the five reviews.
   One dark opening (the hero), then a steady light page; the footer closes on Ink. Copy: lib/content.ts.
   Systems: README.md. */
export default function Home() {
  return (
    <>
      <Motion />
      <Preloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Vision />
        <Work />
        <Management />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
