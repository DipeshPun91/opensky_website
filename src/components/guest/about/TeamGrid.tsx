"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { slideInBottom, createStaggerContainer } from "@/lib/animations";
import type { Member } from "@/lib/members";

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

export default function TeamGrid({ members }: { members: Member[] }) {
  if (members.length === 0) {
    return <p className="text-center text-gray-500">Team info coming soon.</p>;
  }

  return (
    <motion.div
      variants={teamContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap -m-4 max-w-7xl mx-auto"
    >
      {members.map((member) => {
        // lib/members.ts always stores facebook/instagram as strings
        // (empty string when unset), not undefined like the old dummy
        // data — so presence is checked against "" rather than a
        // truthy/falsy optional-field check.
        const hasFacebook = member.facebook !== "";
        const hasInstagram = member.instagram !== "";

        return (
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

                {(hasFacebook || hasInstagram) && (
                  <span className="inline-flex justify-center sm:justify-start">
                    {hasFacebook && (
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
                    {hasInstagram && (
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
        );
      })}
    </motion.div>
  );
}
