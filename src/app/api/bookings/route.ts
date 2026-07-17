import { NextResponse } from "next/server";
import { createBooking } from "@/lib/bookings";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const people = Number(body.people);

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!EMAIL_RE.test(email)) errors.push("A valid email is required.");
  if (!phone) errors.push("Phone is required.");
  if (!date) errors.push("Preferred date is required.");
  if (!Number.isFinite(people) || people < 1) {
    errors.push("Number of people must be at least 1.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    const booking = await createBooking({
      name,
      email,
      phone,
      date,
      people,
      message,
    });
    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 },
    );
  }
}
