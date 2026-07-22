import { getAllGalleryItems } from "@/lib/gallery";
import GalleryMosaic from "@/components/guest/gallery/GalleryMosaic";
import Seperator from "@/components/ui/Seperator";

// Server component — reads directly from MongoDB via lib/gallery.ts
// instead of a hardcoded, tripled Unsplash array. Order matches
// whatever's set in /admin/dashboard/gallery. The animated mosaic
// itself lives in GalleryMosaic (client component, since Framer
// Motion's motion.* requires "use client") — this file no longer needs
// to be a client component now that the data isn't hardcoded.
export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <section className="w-full overflow-hidden bg-linear-to-b from-gray-50 to-white">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto pt-28 sm:pt-32 pb-16 sm:pb-20">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Gallery
          </p>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
            Full Gallery
          </h1>

          <Seperator />

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
            A closer look at the skies, the valley, and the flights that brought
            people back to Open Sky again and again.
          </p>
        </div>

        <GalleryMosaic items={items} />
      </div>
    </section>
  );
}
