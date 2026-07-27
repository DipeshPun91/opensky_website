// components/guest/about/TeamGrid.tsx
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
  // Show beautiful empty state when no members exist
  if (!members || members.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-sky-50 to-blue-50 border border-sky-100/50 mb-4 shadow-sm">
          <svg
            className="w-10 h-10 text-sky-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Our Team Coming Soon
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We&apos;re assembling our expert team of pilots. Check back soon to
          meet the professionals who will take you to the skies.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-200"
              style={{
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={teamContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap -m-4"
    >
      {members.map((member) => {
        const hasFacebook = member.facebook && member.facebook !== "";
        const hasInstagram = member.instagram && member.instagram !== "";

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
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-sky-400 to-blue-500">
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
