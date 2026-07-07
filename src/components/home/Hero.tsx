import { FiArrowUpRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover overflow-hidden"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Overlay — darker at the bottom so the big headline stays readable over the photo */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/50" />

      {/* Cards — decorative on large screens only, so they never overflow or cover text on mobile */}
      <div className="hidden lg:flex absolute left-10 xl:left-16 top-32 z-20 gap-4">
        <div className="w-64 xl:w-72 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 p-8 text-white">
          <h3 className="uppercase text-2xl xl:text-3xl font-bold leading-tight">
            Explore our flying options with pro instructors
          </h3>
          <div className="mt-16 text-right text-3xl font-light">01</div>
        </div>

        <div className="w-64 xl:w-72 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 p-8 text-white mt-28">
          <h3 className="uppercase text-2xl xl:text-3xl font-bold">
            Experience flying above Pokhara
          </h3>
          <div className="mt-16 text-right text-3xl">02</div>
        </div>
      </div>

      {/* Main text */}
      <div className="absolute inset-x-0 bottom-24 sm:bottom-16 lg:bottom-10 z-10 px-6 sm:px-10 lg:px-16">
        <h1 className="text-[15vw] sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[180px] font-black leading-[0.9] text-white uppercase tracking-tight">
          Paragliding
          <br />
          Pokhara
        </h1>
      </div>

      {/* CTA */}
      <button className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 lg:right-16 z-20 bg-orange-500 hover:bg-orange-600 transition rounded-full px-6 sm:px-8 py-3 sm:py-4 text-white flex items-center gap-2 font-semibold text-sm sm:text-base">
        Book Flight
        <FiArrowUpRight />
      </button>
    </section>
  );
}
