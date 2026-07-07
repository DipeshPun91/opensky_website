import Image from "next/image";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Emily Johnson",
    country: "United Kingdom",
    image: "/images/user1.jpg",
    review:
      "An unforgettable experience! The team made me feel safe from the beginning, and the views over Lefkada were absolutely breathtaking. Highly recommended!",
  },
  {
    name: "Michael Brown",
    country: "Germany",
    image: "/images/user2.jpg",
    review:
      "Professional instructors, excellent equipment, and an adventure I'll never forget. Flying above the sea was a dream come true.",
  },
  {
    name: "Sophia Williams",
    country: "Australia",
    image: "/images/user3.jpg",
    review:
      "Everything was perfectly organized. The photos and videos turned out amazing, and I can't wait to come back next summer!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#faf7f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-orange-500 font-semibold">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl lg:text-6xl font-black uppercase">
            What Our Clients Say
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-8">
            Thousands of happy adventurers have experienced the magic of tandem
            paragliding with us.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-[35px] p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              {/* Quote */}

              <div className="absolute right-8 top-8 text-orange-500 opacity-20">
                <FaQuoteRight size={60} />
              </div>

              {/* Stars */}

              <div className="flex gap-1 text-orange-500 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-8">"{item.review}"</p>

              {/* User */}

              <div className="flex items-center gap-4 mt-8">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-bold">{item.name}</h4>

                  <p className="text-gray-500 text-sm">{item.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <h3 className="text-5xl font-black text-orange-500">2500+</h3>
            <p className="mt-2 uppercase tracking-[2px] text-sm">
              Happy Clients
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-orange-500">10+</h3>
            <p className="mt-2 uppercase tracking-[2px] text-sm">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-orange-500">100%</h3>
            <p className="mt-2 uppercase tracking-[2px] text-sm">
              Safety Record
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-orange-500">4.9★</h3>
            <p className="mt-2 uppercase tracking-[2px] text-sm">
              Average Rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
