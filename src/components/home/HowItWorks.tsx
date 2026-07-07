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
      "Enjoy breathtaking panoramic views while safely soaring above Lefkada.",
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-20">
          <p className="uppercase tracking-[4px] text-orange-500 font-medium">
            Simple Process
          </p>

          <h2 className="mt-4 text-4xl lg:text-6xl font-black uppercase">
            How It Works
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-8">
            From booking your flight to landing with unforgettable memories,
            your paragliding adventure is just four simple steps away.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative">
          {/* Dashed Line (Desktop) */}

          <div className="hidden lg:block absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-orange-300"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex ${
                  index % 2 === 0 ? "lg:items-start" : "lg:items-end lg:pt-24"
                }`}
              >
                <div className="bg-white rounded-[35px] shadow-lg p-8 border border-gray-100 hover:-translate-y-2 transition duration-300">
                  <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>

                  <span className="text-orange-500 font-bold tracking-[3px]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
