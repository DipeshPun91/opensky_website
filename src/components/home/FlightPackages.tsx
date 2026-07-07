import Image from "next/image";
import { FaArrowRight, FaClock, FaMountain, FaCamera } from "react-icons/fa6";

const flights = [
  {
    title: "Classic Flight",
    price: "$70",
    image: "/images/flight-1.jpg",
    duration: "20 - 25 min",
    altitude: "1,592m",
    photos: "Photos included",
  },
  {
    title: "Adventure Flight",
    price: "$100",
    image: "/images/flight-2.jpg",
    duration: "30 - 35 min",
    altitude: "1,592m",
    photos: "Photos + video",
  },
  {
    title: "Panorama VIP Flight",
    price: "$150",
    image: "/images/flight-3.jpg",
    duration: "45+ min",
    altitude: "1,592m",
    photos: "4K video",
  },
];

export default function FlightPackages() {
  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-orange-500 font-medium">
            Tandem Flights
          </p>

          <h2 className="mt-4 text-4xl lg:text-6xl font-black uppercase">
            Choose Your Flight
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-8">
            Choose the experience that suits you best and enjoy breathtaking
            views over Pokhara, Phewa Lake, and the Annapurna range with our
            certified tandem pilots.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-3"
            >
              {/* Image */}
              <div className="relative h-[380px] group overflow-hidden">
                <Image
                  src={flight.image}
                  alt={flight.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute top-5 right-5 bg-orange-500 text-white rounded-full px-6 py-3 font-bold text-lg">
                  {flight.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-black uppercase mb-8">
                  {flight.title}
                </h3>

                <div className="space-y-5 text-gray-700">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-orange-500" />
                    <span>{flight.duration}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMountain className="text-orange-500" />
                    <span>{flight.altitude} launch (Sarangkot)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCamera className="text-orange-500" />
                    <span>{flight.photos}</span>
                  </div>
                </div>

                <button className="mt-10 w-full rounded-full bg-black text-white py-4 uppercase tracking-[2px] font-semibold flex justify-center items-center gap-3 hover:bg-orange-500 transition">
                  Book Flight
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
