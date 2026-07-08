import {
  FaCalendarCheck,
  FaUsers,
  FaParachuteBox,
  FaCamera,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Book Your Flight",
    description:
      "Choose your preferred tandem flight package and reserve your date online.",
    icon: <FaCalendarCheck size={34} />,
  },
  {
    number: "02",
    title: "Meet Your Pilot",
    description:
      "Our certified instructors will welcome you and explain everything before takeoff.",
    icon: <FaUsers size={34} />,
  },
  {
    number: "03",
    title: "Take Off & Fly",
    description:
      "Enjoy breathtaking panoramic views while safely soaring above Pokhara Valley.",
    icon: <FaParachuteBox size={34} />,
  },
  {
    number: "04",
    title: "Photos & Memories",
    description:
      "Receive amazing photos and videos to remember your adventure forever.",
    icon: <FaCamera size={34} />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Simple Process
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            How It Works
          </h2>

          <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base">
            From booking your flight to landing with unforgettable memories,
            your paragliding adventure in Pokhara is just four simple steps
            away.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Dashed Line (Desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-sky-200"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex ${
                  index % 2 === 0 ? "lg:items-start" : "lg:items-end lg:pt-24"
                }`}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-7 md:p-8 border border-gray-100 hover:-translate-y-2 transition duration-300 w-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center mb-4 sm:mb-6">
                    {step.icon}
                  </div>

                  <span className="text-sky-500 font-bold tracking-[3px] text-xs sm:text-sm">
                    {step.number}
                  </span>

                  <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-black uppercase leading-tight text-gray-800">
                    {step.title}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 max-w-7xl mx-auto">
          <button className="inline-flex items-center gap-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:scale-105 group text-sm">
            Start Your Adventure
            <FaParachuteBox
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
