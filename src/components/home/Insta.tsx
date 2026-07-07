import Image from "next/image";
import { FaInstagram, FaArrowRight } from "react-icons/fa6";

const posts = [
  "/images/instagram/insta-1.jpg",
  "/images/instagram/insta-2.jpg",
  "/images/instagram/insta-3.jpg",
  "/images/instagram/insta-4.jpg",
  "/images/instagram/insta-5.jpg",
  "/images/instagram/insta-6.jpg",
];

export default function Insta() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-orange-500 font-semibold">
            Follow Us
          </p>

          <h2 className="mt-4 text-4xl lg:text-6xl font-black uppercase">
            Instagram Feed
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-8">
            Follow our adventures and discover breathtaking moments captured
            during tandem paragliding flights over Lefkada.
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[30px] aspect-square cursor-pointer"
            >
              <Image
                src={image}
                alt={`Instagram ${index + 1}`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-5xl opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Button */}

        <div className="mt-16 flex justify-center">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-white uppercase tracking-[2px] font-semibold hover:bg-orange-600 transition"
          >
            Follow on Instagram
            <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
