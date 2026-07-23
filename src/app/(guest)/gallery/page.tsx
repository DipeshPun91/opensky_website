import { getAllGalleryItems } from "@/lib/gallery";
import GalleryMosaic from "@/components/guest/gallery/GalleryMosaic";
import Separator from "@/components/ui/Seperator";

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Gallery
          </p>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
            Full Gallery
          </h1>

          <Separator />

          <p className="mt-8 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base text-left sm:text-center">
            A closer look at the skies, the valley, and the flights that brought
            people back to Open Sky again and again.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <GalleryMosaic items={items} />
        </div>
      </div>
    </section>
  );
}
