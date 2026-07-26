import Header from "@/components/partials/Header";
import Hero from "@/components/guest/home/Hero";
import Stats from "@/components/guest/home/Stats";
import About from "@/components/guest/home/About";
import Features from "@/components/guest/home/Features";
import FlightPackages from "@/components/guest/home/FlightPackages";
import Banner from "@/components/guest/home/Banner";
import HowItWorks from "@/components/guest/home/HowItWorks";
import Testimonials from "@/components/guest/home/Testimonials";
import Cta from "@/components/guest/home/Cta";
import Footer from "@/components/partials/Footer";
import Gallery from "@/components/guest/home/Gallery";
import { getAllGalleryItems, type GalleryItem } from "@/lib/gallery";

export default async function Home() {
  let galleryItems: GalleryItem[] = [];

  try {
    galleryItems = await getAllGalleryItems();
  } catch (error) {
    console.error("Failed to load gallery items for the home page", error);
  }

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
      <Gallery items={galleryItems} />
      <Cta />
      <Footer />
    </>
  );
}
