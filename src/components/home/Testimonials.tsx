import Image from "next/image";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Emily Johnson",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=center",
    review:
      "An unforgettable experience! The team made me feel safe from the beginning, and the views over Pokhara Valley and the Annapurna range were absolutely breathtaking. Highly recommended!",
  },
  {
    name: "Michael Brown",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=center",
    review:
      "Professional instructors, excellent equipment, and an adventure I'll never forget. Flying above Phewa Lake with the Himalayas in the background was a dream come true.",
  },
  {
    name: "Sophia Williams",
    country: "Australia",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=center",
    review:
      "Everything was perfectly organized. The photos and videos turned out amazing with the stunning mountain backdrop, and I can't wait to come back next season!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Testimonials
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            What Our Clients Say
          </h2>

          <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
            Thousands of happy adventurers have experienced the magic of tandem
            paragliding with us in Pokhara.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-gray-100"
            >
              {/* Quote */}
              <div className="absolute right-6 sm:right-8 top-6 sm:top-8 text-sky-500/10">
                <FaQuoteRight size={50} className="sm:w-15 sm:h-15" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-sky-400 mb-4 sm:mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 sm:w-5 sm:h-5" />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
                &ldquo;{item.review}&rdquo;
              </p>

              {/* User */}
              <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 overflow-hidden rounded-full ring-2 ring-sky-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-800">
                    {item.name}
                  </h4>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    {item.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-7xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500">
              2500+
            </h3>
            <p className="mt-2 uppercase tracking-[2px] text-xs sm:text-sm text-gray-600 font-medium">
              Happy Clients
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500">
              10+
            </h3>
            <p className="mt-2 uppercase tracking-[2px] text-xs sm:text-sm text-gray-600 font-medium">
              Years Experience
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500">
              100%
            </h3>
            <p className="mt-2 uppercase tracking-[2px] text-xs sm:text-sm text-gray-600 font-medium">
              Safety Record
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500">
              4.9★
            </h3>
            <p className="mt-2 uppercase tracking-[2px] text-xs sm:text-sm text-gray-600 font-medium">
              Average Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
