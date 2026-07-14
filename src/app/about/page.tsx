"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
} from "@/lib/animations";
import Separator from "@/components/ui/Seperator";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image: string;
  facebook?: string;
  instagram?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Chief Pilot & Founder",
    bio: "15 years of paragliding experience across 6 continents. Passionate about sharing the joy of flight with adventurers from around the world.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Senior Pilot & Safety Officer",
    bio: "12 years of experience with advanced certification in rescue operations. Dedicated to ensuring every flight is both thrilling and completely safe.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Paragliding Pilot",
    bio: "10 years of experience, specializing in tandem flights and aerial photography. Known for creating unforgettable flying experiences.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    instagram: "https://instagram.com",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Paragliding Pilot",
    bio: "8 years of experience with expertise in thermal flying. Passionate about making paragliding accessible to people of all ages.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    id: 5,
    name: "David Chen",
    role: "Paragliding Pilot",
    bio: "11 years of experience in mountain flying. Expert in cross-country flights and weather analysis for optimal flying conditions.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    facebook: "https://facebook.com",
  },
  {
    id: 6,
    name: "Emma Rodriguez",
    role: "Paragliding Pilot",
    bio: "9 years of experience with a focus on eco-tourism and sustainable adventure travel. Committed to preserving Nepal's natural beauty.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    instagram: "https://instagram.com",
  },
  {
    id: 7,
    name: "Michael Okafor",
    role: "Paragliding Pilot",
    bio: "14 years of experience in aerial sports. Expert in high-altitude flights and emergency procedures.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  {
    id: 8,
    name: "Sophie Laurent",
    role: "Paragliding Pilot",
    bio: "7 years of experience with a background in meteorology. Passionate about providing guests with the safest and most scenic flights possible.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    instagram: "https://instagram.com",
  },
];

const teamContainer = createStaggerContainer(0.08, 0.15);

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function About() {
  return (
    <>
      {/* Intro */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            variants={riseIn}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Who We Are
            </p>

            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
              About Us
            </h1>

            <motion.div variants={riseIn}>
              <Separator />
            </motion.div>

            <motion.p
              variants={riseIn}
              className="mt-8 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base text-left sm:text-center"
            >
              Paragliding in Pokhara gives you an opportunity to discover some
              of the best scenery on earth, as we take you to share airspace
              with birds, kites and fly over villages, monasteries, temples,
              pristine Phewa lake and jungle, with a fantastic view of the
              majestic Himalaya.
            </motion.p>

            <motion.p
              variants={riseIn}
              className="mt-6 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base text-left sm:text-center"
            >
              Open Sky Paragliding is a platform with years of experience in
              this sector to make flying dreams come alive. We have a team of
              highly skilled and certified pilots who are committed to your
              safety so you could enjoy your moments with joy. Your safety is
              our top priority — we keep daily track of weather information to
              ensure your flight is secure in the sky. We assure you of our best
              service at all times to help you create happy and blissful
              memories along your journey into the sky. So, if you are an
              adventure enthusiast and want to experience flying, we are more
              than delighted to welcome you to{" "}
              <span className="font-bold text-gray-900">Open Sky</span>!!
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden"
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            variants={riseIn}
            className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          >
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Meet The Pilots
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Our Team
            </h2>

            <motion.div variants={riseIn}>
              <Separator />
            </motion.div>
          </motion.div>

          <motion.div
            variants={teamContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap -m-4 max-w-7xl mx-auto"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={slideInBottom}
                className="p-4 lg:w-1/2"
              >
                <div className="group h-full flex sm:flex-row flex-col items-center sm:items-start sm:justify-start justify-center text-center sm:text-left">
                  <div className="relative shrink-0 rounded-lg w-48 h-48 overflow-hidden sm:mb-0 mb-4 bg-sky-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition duration-700"
                        sizes="192px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-sky-500">
                        <span className="text-4xl font-black text-white uppercase">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grow sm:pl-8">
                    <h3 className="title-font font-bold uppercase text-lg text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sky-500 text-sm font-medium uppercase tracking-wide mb-3">
                      {member.role}
                    </p>

                    {member.bio && (
                      <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {(member.facebook || member.instagram) && (
                      <span className="inline-flex justify-center sm:justify-start">
                        {member.facebook && (
                          <Link
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Facebook`}
                            className="text-gray-500 hover:text-sky-500 transition duration-300"
                          >
                            <FaFacebookF className="w-5 h-5" />
                          </Link>
                        )}
                        {member.instagram && (
                          <Link
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="ml-3 text-gray-500 hover:text-sky-500 transition duration-300"
                          >
                            <FaInstagram className="w-5 h-5" />
                          </Link>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
