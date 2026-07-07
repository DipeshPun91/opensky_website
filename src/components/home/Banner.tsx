import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Banner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[50px] bg-[#F7941D] px-8 py-20 lg:px-20">
          {/* Decorative circles */}

          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10" />

          {/* Left Image */}

          <div className="absolute left-10 bottom-0 hidden lg:block">
            <div className="relative h-[420px] w-[240px]">
              <Image
                src="/images/banner-left.png"
                alt="Paragliding"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Image */}

          <div className="absolute right-8 top-10 hidden lg:block">
            <div className="relative h-[320px] w-[230px]">
              <Image
                src="/images/banner-right.png"
                alt="Paragliding"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}

          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <p className="uppercase tracking-[4px] text-sm font-medium">
              Ready For Adventure?
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase leading-tight lg:text-7xl">
              Feel The Freedom
              <br />
              Of Flying
            </h2>

            <p className="mt-8 text-lg leading-8 text-white/90">
              Experience unforgettable tandem paragliding flights above the
              crystal-clear beaches of Lefkada with our certified pilots.
            </p>

            <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-white hover:text-black">
              Book Your Flight
              <FaArrowRight />
            </button>
          </div>

          {/* Decorative Curved Line */}

          <svg
            className="absolute left-1/2 top-10 hidden -translate-x-1/2 lg:block"
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
              opacity=".5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
