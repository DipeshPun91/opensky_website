import { FaArrowRight } from "react-icons/fa6";
import ImgStack from "@/components/ui/ImgStack";

export default function About() {
  // Image URLs for the stack
  const images = [
    "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBhcmFnbGlkaW5nfGVufDB8fDB8fHww",
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Label */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <span className="uppercase tracking-[3px] text-xs sm:text-sm font-medium flex items-center gap-2 text-gray-600">
            <span className="text-sky-500 text-xl">•</span>
            Welcome To Open Sky Paragliding Pokhara
          </span>
        </div>

        {/* Content - Image Stack Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left - Image Stack */}
          <div className="flex justify-center">
            <ImgStack images={images} />
          </div>

          {/* Right Content */}
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-black leading-tight uppercase">
              <span className="text-sky-500">Soar Above Pokhara:</span>
              <br />
              <span className="text-gray-800">
                Your Ultimate Tandem Paragliding Experience Awaits!
              </span>
            </h2>

            <div className="w-16 h-1 bg-sky-500 mt-4 rounded-full"></div>

            <p className="mt-5 sm:mt-6 text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-7">
              Let us take your dreams to new heights! Experience the
              breathtaking beauty of the Pokhara Valley, Phewa Lake, and the
              Annapurna range from an aerial view with our thrilling tandem
              paragliding adventures.
            </p>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed sm:leading-7">
              Whether you&apos;re a seasoned adrenaline junkie or a first-time
              flyer, our expert instructors are here to ensure you have a safe,
              exhilarating, and unforgettable journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md uppercase tracking-[2px] font-semibold flex items-center justify-center gap-3 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 group text-sm">
                Book Flight
                <FaArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="border-2 border-gray-300 hover:border-sky-500 px-6 sm:px-8 py-3 sm:py-3.5 rounded-md uppercase tracking-[2px] font-semibold text-gray-700 hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 text-sm">
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
