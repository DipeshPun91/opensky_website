import Separator from "@/components/ui/Seperator";
import { getAllMembers } from "@/lib/members";
import TeamGrid from "@/components/guest/about/TeamGrid";
import Image from "next/image";
import {
  FaShieldAlt,
  FaUserTie,
  FaHeart,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

export default async function About() {
  const members = await getAllMembers();

  const values = [
    {
      icon: FaUserTie,
      title: "Certified Pilots",
      description: "Internationally trained and certified professionals",
    },
    {
      icon: FaShieldAlt,
      title: "Safety First",
      description: "Daily weather monitoring and rigorous equipment checks",
    },
    {
      icon: FaHeart,
      title: "Unforgettable Experience",
      description: "Creating blissful memories in the sky",
    },
    {
      icon: FaClock,
      title: "Years of Expertise",
      description: "Decades of combined industry experience",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Who We Are
            </p>

            <h1 className="mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight text-gray-900">
              About Open Sky
            </h1>

            <Separator />

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Experience the thrill of paragliding over the breathtaking
              landscapes of Pokhara
            </p>
          </div>

          {/* Hero Content with Image */}
          <div className="mt-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&crop=center"
                alt="Paragliding above Pokhara"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-5 order-1 lg:order-2">
              <p className="text-gray-600 leading-relaxed">
                Paragliding in Pokhara gives you an opportunity to discover some
                of the best scenery on earth, as we take you to share airspace
                with birds, kites and fly over villages, monasteries, temples,
                pristine Phewa lake and jungle, with a fantastic view of the
                majestic Himalaya.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Open Sky Paragliding is a platform with years of experience in
                this sector to make flying dreams come alive. We have a team of
                highly skilled and certified pilots who are committed to your
                safety so you could enjoy your moments with joy.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Your safety is our top priority — we keep daily track of weather
                information to ensure your flight is secure in the sky. We
                assure you of our best service at all times to help you create
                happy and blissful memories along your journey into the sky.
              </p>

              <p className="text-gray-600 leading-relaxed">
                So, if you are an adventure enthusiast and want to experience
                flying, we are more than delighted to welcome you to{" "}
                <span className="font-semibold text-gray-900">Open Sky</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50 w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Our Mission
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Your Gateway to the Himalayan Skies
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover the beauty of Pokhara from above
            </p>

            <Separator />
          </div>

          {/* Mission Content with Image */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Paragliding in Pokhara offers a once-in-a-lifetime opportunity
                to discover some of the most spectacular scenery on earth. We
                take you to share airspace with birds and kites, soaring over
                ancient villages, monasteries, temples, the pristine Phewa Lake,
                and lush jungles—all with a breathtaking view of the majestic
                Himalayas.
              </p>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Our Commitment to Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Open Sky Paragliding is built on years of industry expertise,
                  dedicated to turning flying dreams into reality. Our team
                  consists of highly skilled and certified pilots who prioritize
                  your safety above all else. We meticulously monitor weather
                  conditions daily to ensure every flight is secure and
                  enjoyable.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center"
                alt="Tandem paragliding pilot over Pokhara"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Why Fly With Us
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Our Values
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              What makes Open Sky your trusted paragliding partner
            </p>

            <Separator />
          </div>

          {/* Values Grid - Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-gray-50 hover:bg-sky-50 rounded-2xl p-6 border border-gray-200 hover:border-sky-200 transition duration-300 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white mx-auto group-hover:scale-105 transition duration-300">
                  <value.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-lg font-bold text-gray-900">
                  {value.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50 w-full overflow-hidden border-y border-gray-100">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Get Started
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Ready to Take Flight?
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Join us for an adventure of a lifetime. Book your paragliding
              experience today.
            </p>

            <Separator />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-8 py-3.5 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 text-sm"
            >
              Book Your Flight
              <FaPaperPlane className="h-3.5 w-3.5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white hover:bg-gray-50 transition-all duration-300 text-gray-900 px-8 py-3.5 font-semibold uppercase tracking-[2px] border border-gray-300 text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Meet The Pilots
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Our Expert Pilots
            </h2>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your safety and unforgettable
              experience
            </p>

            <Separator />
          </div>

          <TeamGrid members={members} />
        </div>
      </section>
    </>
  );
}
