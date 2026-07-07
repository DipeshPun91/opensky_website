import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Cta() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-[650px] overflow-hidden rounded-[45px]">
          {/* Background Image */}
          <Image
            src="/images/cta-bg.jpg"
            alt="Paragliding"
            fill
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl text-center text-white px-6">
              <p className="uppercase tracking-[4px] text-sm text-orange-400 font-medium">
                Your Adventure Starts Here
              </p>

              <h2 className="mt-6 text-5xl lg:text-7xl font-black uppercase leading-tight">
                Fly Above
                <br />
                Beautiful Lefkada
              </h2>

              <p className="mt-8 text-lg text-white/90 leading-8 max-w-2xl mx-auto">
                Experience the thrill of tandem paragliding with our certified
                instructors and enjoy breathtaking panoramic views over the
                crystal-clear waters of Lefkada.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-5">
                <button className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-white uppercase tracking-[2px] font-semibold transition hover:bg-orange-600">
                  Book Your Flight
                  <FaArrowRight />
                </button>

                <button className="rounded-full border border-white px-8 py-4 uppercase tracking-[2px] font-semibold text-white transition hover:bg-white hover:text-black">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
