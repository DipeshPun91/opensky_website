// app/admin/dashboard/bookings/page.tsx
import { FiCalendar, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { getAllBookings } from "@/lib/bookings";
import BookingsTable from "@/components/admin/BookingsTable";
import Banner from "@/components/admin/Banner";
import StatsBar from "@/components/admin/StatsBar";
import Content from "@/components/admin/Content";
import { countByStatus } from "@/lib/utils";

export default async function BookingsPage() {
  const bookings = await getAllBookings();

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: <FiCalendar className="h-3.5 w-3.5" />,
    },
    {
      label: "Confirmed",
      value: countByStatus(bookings, "confirmed"),
      icon: <FiCheckCircle className="h-3.5 w-3.5" />,
    },
    {
      label: "Pending",
      value: countByStatus(bookings, "pending"),
      icon: <FiClock className="h-3.5 w-3.5" />,
    },
    {
      label: "Cancelled",
      value: countByStatus(bookings, "cancelled"),
      icon: <FiXCircle className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <Content>
      <Banner
        title="Bookings"
        description="Review and manage tandem flight booking requests submitted from your site."
      />
      <StatsBar stats={stats} />
      <BookingsTable initialBookings={bookings} />
    </Content>
  );
}
