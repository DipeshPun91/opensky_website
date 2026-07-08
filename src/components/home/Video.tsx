import Image from "next/image";
import { FaPlay, FaArrowRight, FaVideo } from "react-icons/fa6";

const videos = [
  {
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center",

    title: "Soaring Above Pokhara Valley",
    duration: "2:35",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=600&auto=format&fit=crop&crop=center",

    title: "Tandem Flight Over Phewa Lake",
    duration: "3:20",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&crop=center",

    title: "Himalayan Paragliding Adventure",
    duration: "4:15",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center",
    title: "Sunset Flight Experience",
    duration: "2:50",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&crop=center",

    title: "Professional Pilot Training",
    duration: "3:45",
  },
  {
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center",
    title: "Customer Testimonial Flight",
    duration: "2:15",
  },
];

export default function Videos() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Customer Experiences
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            Watch Our Videos
          </h2>

          <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
            See real customer experiences and breathtaking views from our tandem
            paragliding flights over Pokhara Valley and the Himalayas.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-sky-500/90 backdrop-blur flex items-center justify-center transition duration-300 group-hover:scale-110 group-hover:bg-sky-600 shadow-lg shadow-sky-500/30">
                    <FaPlay className="text-white text-xl sm:text-2xl md:text-3xl ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-xs sm:text-sm font-medium px-2.5 py-1 rounded-md">
                  {video.duration}
                </div>

                {/* Video Icon Badge */}
                <div className="absolute top-3 left-3 bg-sky-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  <FaVideo className="inline mr-1.5" />
                  Video
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-linear-to-t from-black/80 to-transparent">
                <h3 className="text-white text-sm sm:text-base font-bold leading-tight line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16 flex justify-center max-w-7xl mx-auto">
          <button className="inline-flex items-center gap-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 group text-sm">
            Watch More Videos
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
