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
        <div className="max-w-5xl text-center text-white">
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
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
            <button className="inline-flex items-center gap-2 sm:gap-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 group text-sm sm:text-base">
              Book Your Flight
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="rounded-md border-2 border-white/80 hover:border-white px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-[2px] font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base">
              Learn More
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 sm:mt-12 md:mt-14 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-sky-400">
                2500+
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
                Happy Clients
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-sky-400">
                4.9★
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
                Average Rating
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-sky-400">
                100%
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
                Safety Record
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-sky-400">
                10+
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mt-1">
                Years Experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
