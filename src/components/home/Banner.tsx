import { FaArrowRight } from "react-icons/fa6";

export default function Banner() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
      <div className="relative w-full overflow-hidden bg-linear-to-br from-sky-500 to-sky-600 px-6 py-16 sm:px-10 lg:px-20 sm:py-20 lg:py-24">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-125 rounded-full bg-white/5" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <p className="uppercase tracking-[4px] text-sm font-medium text-white/80">
            Ready For Adventure?
          </p>

          <h2 className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight">
            Soar Above
            <br />
            The Himalayas
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-white/90 max-w-2xl mx-auto">
            Experience the thrill of tandem paragliding over Pokhara Valley,
            Phewa Lake, and the majestic Annapurna range with our certified
            pilots.
          </p>

          <button className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-md bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase tracking-[2px] text-sky-600 transition hover:bg-sky-50 hover:scale-105 shadow-lg shadow-white/20">
            Book Your Flight
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative Curved Line */}
        <svg
          className="absolute left-1/2 top-8 hidden -translate-x-1/2 lg:block"
          width="500"
          height="180"
          viewBox="0 0 500 180"
          fill="none"
        >
          <path
            d="M10 120C120 10 380 10 490 120"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10 10"
            opacity=".3"
          />
        </svg>

        {/* Decorative dots at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/60"></div>
          <div className="w-2 h-2 rounded-full bg-white/80"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    </section>
  );
}
