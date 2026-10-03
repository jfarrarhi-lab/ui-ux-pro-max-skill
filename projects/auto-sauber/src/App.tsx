import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Usp } from "./components/Usp";
import { Services } from "./components/Services";
import { Programs } from "./components/Programs";
import { BeforeAfter } from "./components/BeforeAfter";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { CtaBand } from "./components/CtaBand";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileBar } from "./components/MobileBar";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Usp />
        <Services />
        <Programs />
        <BeforeAfter />
        <About />
        <Gallery />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
