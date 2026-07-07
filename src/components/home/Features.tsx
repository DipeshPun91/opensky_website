import Image from "next/image";

export default function Feature() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-sm text-orange-500 font-medium">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl lg:text-6xl font-black uppercase leading-tight">
            Experience The Difference
          </h2>
        </div>

        {/* Top Grid */}
        {/* items-center: the 340px cards and 500px images share a row — without this
            the grid stretches the row to 500px and leaves a dead gap under each card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:items-center">
          {/* Card 1 */}
          <div className="rounded-[35px] bg-black text-white p-8 h-[340px] flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm tracking-[3px] opacity-70">01</span>

              <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                Discover
                <br />
                Beautiful
                <br />
                Pokhara
              </h3>
            </div>

            <p className="text-sm leading-7 text-gray-300">
              Fly over Phewa Lake and the Pokhara Valley and enjoy breathtaking
              panoramic views with our experienced instructors.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[380px] md:h-[500px] overflow-hidden rounded-[35px] group">
            <Image
              src="/images/feature-1.jpg"
              alt="Paragliding above Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* Card 2 */}
          <div className="rounded-[35px] bg-[#F5E7DD] p-8 h-[340px] flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm tracking-[3px] opacity-70">02</span>

              <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                Professional
                <br />
                Pilots
              </h3>
            </div>

            <p className="text-sm leading-7 text-gray-700">
              Our certified tandem pilots ensure every flight is exciting,
              smooth and completely safe.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-[35px] bg-[#F5E7DD] p-8 h-[340px] flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm tracking-[3px] opacity-70">03</span>

              <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                Modern
                <br />
                Equipment
              </h3>
            </div>

            <p className="text-sm leading-7 text-gray-700">
              We use internationally certified equipment that&apos;s inspected
              before every flight.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[380px] md:h-[500px] overflow-hidden rounded-[35px] group">
            <Image
              src="/images/feature-2.jpg"
              alt="Tandem paragliding pilot over Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Card 4 */}
          <div className="rounded-[35px] bg-[#F5E7DD] p-8 h-[300px] flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm tracking-[3px] opacity-70">04</span>

              <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                Amazing
                <br />
                Memories
              </h3>
            </div>

            <p className="text-sm leading-7 text-gray-700">
              Capture incredible photos and videos while flying high above Phewa
              Lake and the Annapurna range.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-[35px] bg-black text-white p-8 h-[300px] flex flex-col justify-between hover:-translate-y-2 transition duration-300">
            <div>
              <span className="text-sm tracking-[3px] opacity-70">05</span>

              <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                Easy
                <br />
                Online Booking
              </h3>
            </div>

            <p className="text-sm leading-7 text-gray-300">
              Reserve your tandem flight in just a few clicks and get ready for
              an unforgettable adventure.
            </p>
          </div>

          {/* Orange Card */}
          <div className="rounded-[35px] bg-orange-500 text-white h-[300px] flex items-center justify-center p-10 md:col-span-2 lg:col-span-1">
            <h3 className="text-4xl lg:text-5xl font-black uppercase leading-tight text-center">
              Your Next
              <br />
              Adventure
              <br />
              Starts Here
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
