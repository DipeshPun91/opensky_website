import { getAllBookings } from "@/lib/bookings";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function BookingsPage() {
  const bookings = await getAllBookings();

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
        Admin Panel
      </p>
      <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
        Bookings
      </h1>
      <p className="mb-8 text-sm text-gray-400">
        Review and manage tandem flight booking requests submitted from your
        site.
      </p>

      <BookingsTable initialBookings={bookings} />
    </div>
  );
}
