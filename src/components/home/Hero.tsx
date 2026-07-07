export default function Hero() {
  return (
    <section
      className="relative min-h-svh lg:min-h-screen bg-cover bg-center overflow-hidden flex flex-col justify-center lg:block"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />

      <div
        className="relative z-10 flex flex-col gap-8 px-4 sm:px-6 md:px-10 py-20
                   lg:block lg:absolute lg:inset-x-0 lg:top-28 xl:top-32 lg:px-16 lg:py-0"
      >
        {/* Main text */}
        <div>
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] 2xl:text-[180px] font-black leading-[0.9] uppercase tracking-tight drop-shadow-2xl">
            <span
              className="block"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                color: "transparent",
              }}
            >
              Paragliding
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                color: "transparent",
              }}
            >
              Pokhara
            </span>
          </h1>

          <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-2 sm:mt-3 md:mt-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl font-light tracking-wide drop-shadow-lg">
            Experience the thrill of flying over the stunning Himalayas
          </p>
        </div>

        {/* Cards one */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:hidden">
          <div className="w-full sm:max-w-sm overflow-hidden rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 p-4 sm:p-5 text-white">
            <h3 className="uppercase text-xs sm:text-sm md:text-base font-bold leading-snug">
              Explore our flying options with pro instructors
            </h3>
            <div className="flex justify-end mt-3 sm:mt-4">
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-black leading-none"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                  color: "transparent",
                }}
              >
                01
              </span>
            </div>
          </div>

          <div className="w-full sm:max-w-sm overflow-hidden rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 p-4 sm:p-5 text-white">
            <h3 className="uppercase text-xs sm:text-sm md:text-base font-bold leading-snug">
              Experience flying above Pokhara
            </h3>
            <p className="text-[10px] sm:text-xs text-white/70 mt-1 font-light">
              Professional guides, breathtaking views
            </p>
            <div className="flex justify-end mt-3 sm:mt-4">
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-black leading-none"
                style={{
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                  color: "transparent",
                }}
              >
                02
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards two */}
      <div className="hidden lg:flex absolute bottom-10 xl:bottom-16 right-10 xl:right-16 z-20 gap-4 items-end">
        <div className="relative w-72 xl:w-80 overflow-hidden rounded-2xl bg-black/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 p-6 text-white hover:bg-black/20 transition duration-300 shadow-2xl">
          <div className="relative z-10">
            <h3 className="uppercase text-lg xl:text-xl font-bold leading-snug">
              Explore our flying options with pro instructors
            </h3>
          </div>
          <div className="relative z-10 mt-10 flex justify-end">
            <span
              className="text-6xl xl:text-7xl font-black leading-none"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                color: "transparent",
              }}
            >
              01
            </span>
          </div>
        </div>

        <div className="relative w-72 xl:w-80 overflow-hidden rounded-2xl bg-black/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 p-6 text-white hover:bg-black/20 transition duration-300 shadow-2xl">
          <div className="relative z-10">
            <h3 className="uppercase text-lg xl:text-xl font-bold leading-snug">
              Experience flying above Pokhara
            </h3>
            <p className="text-sm xl:text-base text-white/70 mt-2 font-light">
              Professional guides, breathtaking views
            </p>
          </div>
          <div className="relative z-10 mt-20 flex justify-end">
            <span
              className="text-6xl xl:text-7xl font-black leading-none"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.6)",
                color: "transparent",
              }}
            >
              02
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
