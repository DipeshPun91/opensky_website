import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Label */}
        <div className="flex justify-center mb-5">
          <span className="uppercase tracking-[3px] text-sm font-medium flex items-center gap-2">
            <span className="text-xl">•</span>
            Welcome To Open Sky Paragliding Pokhara
          </span>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[280px_1fr_280px] gap-10 items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            {/* w-65 / h-105 aren't real Tailwind classes (no such steps in the
                default scale), so this box had no dimensions and the fill
                image had nothing to fill — replaced with explicit sizes */}
            <div className="relative w-full max-w-[260px] h-[420px] overflow-hidden rounded-[40px]">
              <Image
                src="/images/about-left.jpg"
                alt="Paraglider launching over Pokhara"
                fill
                className="object-cover hover:scale-110 duration-500"
              />
            </div>
          </div>

          {/* Middle Content */}
          <div className="text-center">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight uppercase">
              <span className="text-orange-500">Soar Above Pokhara:</span>
              <br />
              Your Ultimate Tandem Paragliding Experience Awaits!
            </h2>

            <p className="mt-8 text-lg text-gray-700 leading-9 max-w-4xl mx-auto">
              Let us take your dreams to new heights! Experience the
              breathtaking beauty of the Pokhara Valley, Phewa Lake, and the
              Annapurna range from an aerial view with our thrilling tandem
              paragliding adventures. Whether you&apos;re a seasoned adrenaline
              junkie or a first-time flyer, our expert instructors are here to
              ensure you have a safe, exhilarating, and unforgettable journey.
            </p>

            <div className="flex justify-center gap-5 mt-10 flex-wrap">
              <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-full uppercase tracking-[2px] font-semibold flex items-center gap-3">
                Book Flight
                <FaArrowRight size={14} />
              </button>

              <button className="border border-black px-8 py-4 rounded-full uppercase tracking-[2px] hover:bg-black hover:text-white duration-300">
                About Us
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[260px] h-[420px] overflow-hidden rounded-[40px]">
              <Image
                src="/images/about-right.jpg"
                alt="View of Phewa Lake from the air"
                fill
                className="object-cover hover:scale-110 duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
