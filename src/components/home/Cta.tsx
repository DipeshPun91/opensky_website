import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Cta() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center"
        alt="Paragliding over Pokhara"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center text-white w-full">
          {/* Small Tag */}
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-400 font-medium">
            Your Adventure Starts Here
          </p>

          {/* Main Heading */}
          <h2 className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight">
            <span className="text-sky-400">Open</span>
            <span> Sky</span>
            <br />
            <span className="text-white">Paragliding</span>
          </h2>

          {/* Description */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-7 sm:leading-8 max-w-2xl mx-auto">
            Experience the thrill of tandem paragliding over the stunning
            Pokhara Valley, Phewa Lake, and the majestic Annapurna range with
            our certified instructors.
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            <button className="inline-flex items-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-4 sm:px-5 py-2 sm:py-2.5 font-semibold uppercase tracking-[2px] hover:scale-105 group text-xs sm:text-sm">
              Book Your Flight
              <FaArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button className="rounded-md border-2 border-white/80 hover:border-white px-4 sm:px-5 py-2 sm:py-2.5 uppercase tracking-[2px] font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-xs sm:text-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
