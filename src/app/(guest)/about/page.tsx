import Separator from "@/components/ui/Seperator";
import { getAllMembers } from "@/lib/members";
import TeamGrid from "@/components/guest/about/TeamGrid";

// Server component — the team section now reads from lib/members.ts
// instead of a hardcoded 8-person array, so /admin/dashboard/members
// actually controls who shows up here, and in what order. The intro
// copy below is left as static text: there's no admin page covering
// "About page intro paragraphs" yet, so this stays hardcoded until
// that's built (would most naturally live as a couple of new fields on
// lib/site-config.ts, or its own small settings page).
export default async function About() {
  const members = await getAllMembers();

  return (
    <>
      {/* Intro */}
      <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Who We Are
            </p>

            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
              About Us
            </h1>

            <Separator />

            <p className="mt-8 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base text-left sm:text-center">
              Paragliding in Pokhara gives you an opportunity to discover some
              of the best scenery on earth, as we take you to share airspace
              with birds, kites and fly over villages, monasteries, temples,
              pristine Phewa lake and jungle, with a fantastic view of the
              majestic Himalaya.
            </p>

            <p className="mt-6 text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base text-left sm:text-center">
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
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
              Meet The Pilots
            </p>

            <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight text-gray-900">
              Our Team
            </h2>

            <Separator />
          </div>

          <TeamGrid members={members} />
        </div>
      </section>
    </>
  );
}
