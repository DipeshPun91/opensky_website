import Header from "@/components/partials/Header";
import Hero from "@/components/guest/home/Hero";
import Stats from "@/components/guest/home/Stats";
import About from "@/components/guest/home/About";
import Features from "@/components/guest/home/Features";
import FlightPackages from "@/components/guest/home/FlightPackages";
import Banner from "@/components/guest/home/Banner";
import HowItWorks from "@/components/guest/home/HowItWorks";
import Testimonials from "@/components/guest/home/Testimonials";
import Video from "@/components/guest/home/Video";
import Cta from "@/components/guest/home/Cta";
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
