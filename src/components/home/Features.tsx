import Image from "next/image";

export default function Feature() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Why Choose Us
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            Experience The Difference
          </h2>

          <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Top Row - Arch Pattern */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 lg:items-end max-w-7xl mx-auto">
          {/* Card 1 - Tallest (Left) */}
          <div className="rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-60 lg:h-85 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-400">
                01
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Discover Beautiful Pokhara
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Fly over Phewa Lake and the Pokhara Valley and enjoy breathtaking
              panoramic views with our experienced instructors.
            </p>
          </div>

          {/* Card 2 - Medium */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-50 p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                02
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Professional Pilots
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Our certified tandem pilots ensure every flight is exciting,
              smooth and completely safe.
            </p>
          </div>

          {/* Card 3 - Shortest (Center) */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-100 p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                03
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Modern Equipment
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              We use internationally certified equipment that&apos;s inspected
              before every flight.
            </p>
          </div>

          {/* Card 4 - Medium */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-50 p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                04
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Amazing Memories
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Capture incredible photos and videos while flying high above Phewa
              Lake and the Annapurna range.
            </p>
          </div>

          {/* Card 5 - Tallest (Right) */}
          <div className="rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-60 lg:h-85 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-400">
                05
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Easy Online Booking
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Reserve your tandem flight in just a few clicks and get ready for
              an unforgettable adventure.
            </p>
          </div>
        </div>

        {/* Image Row - Between top and bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 max-w-7xl mx-auto">
          <div className="relative h-60 sm:h-75 md:h-90 overflow-hidden rounded-xl sm:rounded-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&crop=center"
              alt="Paragliding above Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white pr-4">
              <p className="text-xs sm:text-sm font-light tracking-wider uppercase opacity-80">
                Adventure Awaits
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">
                Fly Above the Himalayas
              </h3>
            </div>
          </div>

          <div className="relative h-60 sm:h-75 md:h-90 overflow-hidden rounded-xl sm:rounded-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center"
              alt="Tandem paragliding pilot over Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white pr-4">
              <p className="text-xs sm:text-sm font-light tracking-wider uppercase opacity-80">
                Expert Guidance
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">
                Professional Instructors
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom Row - Arch Pattern (inverted) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 lg:items-start max-w-7xl mx-auto">
          {/* Card 6 - Tallest (Left) */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-50 p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                06
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Best Prices
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Competitive rates without compromising on safety or experience.
            </p>
          </div>

          {/* Card 7 - Medium */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-100 p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                07
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Group Discounts
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Special rates for groups and families.
            </p>
          </div>

          {/* Card 8 - Shortest (Center) */}
          <div className="rounded-xl sm:rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 text-white min-h-40 lg:h-55 flex items-center justify-center p-6 sm:p-7 shadow-xl hover:shadow-2xl transition duration-300 hover:scale-[1.02] overflow-hidden">
            <h3 className="text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-center wrap-break-word">
              Your Next Adventure Starts Here
            </h3>
          </div>

          {/* Card 9 - Medium */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-100 p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                09
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Flexible Scheduling
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Book at your convenience with our flexible timing options.
            </p>
          </div>

          {/* Card 10 - Tallest (Right) */}
          <div className="rounded-xl sm:rounded-2xl bg-sky-50 p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 shadow-md hover:shadow-xl overflow-hidden">
            <div>
              <span className="text-xs sm:text-sm tracking-[3px] opacity-70 text-sky-500">
                10
              </span>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Safety First
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Top priority on safety with certified equipment and trained
              pilots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
