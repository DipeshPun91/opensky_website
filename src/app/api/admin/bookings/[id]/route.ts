import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import {
  updateBookingStatus,
  deleteBooking,
  type BookingStatus,
} from "@/lib/bookings";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];

// PATCH /api/admin/bookings/[id] — update a booking's status
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (
    typeof body.status !== "string" ||
    !VALID_STATUSES.includes(body.status as BookingStatus)
  ) {
    return NextResponse.json(
      { error: `Status must be one of: ${VALID_STATUSES.join(", ")}.` },
      { status: 400 },
    );
  }

  try {
    const updated = await updateBookingStatus(id, body.status as BookingStatus);
    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not update booking.";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

// DELETE /api/admin/bookings/[id]
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteBooking(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not delete booking.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
