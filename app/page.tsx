import RabbaniAssistant from "./components/RabbaniAssistant";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import News from "./components/News";
import Programs from "./components/Programs";
import CTA from "./components/CTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <main className="bg-white">
        <Hero />

        <Stats />

        <About />

        <VisionMission />

        <News />

        <Programs />

        <CTA />

        <Footer />

        <RabbaniAssistant />
      </main>
    </>
  );
}