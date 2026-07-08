import Image from "next/image";
import { FaClock, FaMountain, FaCamera } from "react-icons/fa6";

const flights = [
  {
    tier: "01",
    tag: "Best For First-Timers",
    title: "Classic Flight",
    price: "70",
    image:
      "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&crop=center",
    duration: "20 – 25 min",
    altitude: "1,592m · Sarangkot",
    photos: "Photos included",
    popular: false,
  },
  {
    tier: "02",
    tag: "Most Booked",
    title: "Adventure Flight",
    price: "100",
    image:
      "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center",
    duration: "30 – 35 min",
    altitude: "1,592m · Sarangkot",
    photos: "Photos + video",
    popular: true,
  },
  {
    tier: "03",
    tag: "Full Himalayan Experience",
    title: "Panorama VIP Flight",
    price: "150",
    image:
      "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center",
    duration: "45+ min",
    altitude: "1,592m · Sarangkot",
    photos: "4K video",
    popular: false,
  },
];

export default function FlightPackages() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-14 sm:mb-20 max-w-7xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Paragliding Flights
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            Choose Your Flight
          </h2>

          <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
            Three of Pokhara&apos;s most flown packages, each launching from
            Sarangkot with a certified tandem pilot and views over Phewa Lake
            and the Annapurna range.
          </p>
        </div>

        {/* Cards - All equal height */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {flights.map((flight, index) => (
            <div
              key={index}
              className={`group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 h-full ${
                flight.popular
                  ? "border-sky-500/30 shadow-xl shadow-sky-500/10 lg:-translate-y-2 hover:-translate-y-3"
                  : "border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Most Booked pill */}
              {flight.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-sky-500 text-white text-[11px] font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-b-lg shadow-md">
                  {flight.tag}
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-64 xl:h-72 overflow-hidden shrink-0">
                <Image
                  src={flight.image}
                  alt={flight.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

                {/* Duration pill on image */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-gray-800 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5">
                  <FaClock className="text-sky-500 w-3 h-3" />
                  {flight.duration}
                </div>
              </div>

              {/* Content - Fixed height and flex to fill */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 md:p-8">
                {!flight.popular && (
                  <span className="text-xs font-semibold uppercase tracking-[3px] text-sky-500">
                    {flight.tier} · {flight.tag}
                  </span>
                )}
                {flight.popular && (
                  <span className="text-xs font-semibold uppercase tracking-[3px] text-sky-500">
                    {flight.tier} · Our Recommendation
                  </span>
                )}

                <h3 className="mt-2 text-2xl md:text-3xl font-black uppercase text-gray-900 leading-tight">
                  {flight.title}
                </h3>

                <div className="mt-4 flex items-end gap-1.5">
                  <span className="text-4xl md:text-5xl font-black text-gray-900">
                    ${flight.price}
                  </span>
                  <span className="text-sm text-gray-400 mb-1.5">/ person</span>
                </div>

                <div className="h-px bg-gray-100 my-5" />

                {/* Stats */}
                <div className="space-y-3.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-600 shrink-0">
                      <FaMountain className="w-4 h-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Launch Site
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {flight.altitude}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-50 text-sky-600 shrink-0">
                      <FaCamera className="w-4 h-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[11px] uppercase tracking-wide text-gray-400">
                        Media
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {flight.photos}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA - Always at bottom */}
                <button
                  type="button"
                  className={`mt-6 w-full py-3.5 rounded-lg text-sm font-bold uppercase tracking-wide transition duration-300 ${
                    flight.popular
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  Book This Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
