import Header from "@/components/partials/Header";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Features from "@/components/home/Features";
import FlightPackages from "@/components/home/FlightPackages";
import Banner from "@/components/home/Banner";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Video from "@/components/home/Video";
import Cta from "@/components/home/Cta";
import Footer from "@/components/partials/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <About />
      <Features />
      <FlightPackages />
      <Banner />
      <HowItWorks />
      <Testimonials />
      <Video />
      <Cta />
      <Footer />
    </>
  );
}
