import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface BookingInput {
  name: string;
  email: string;
  phone: string;
  date: string;
  people: number;
  message?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking extends BookingInput {
  id: string;
  status: BookingStatus;
  createdAt: string;
}

// A concrete ObjectId type (rather than a vague custom shape) is what
// keeps MongoDB's TypeScript inference well-behaved — see the note in
// lib/site-config.ts / api-admin-login-route.ts for why a loosely-typed
// _id can silently resolve to `never`.
interface BookingDocument extends BookingInput {
  _id: ObjectId;
  status: BookingStatus;
  createdAt: Date;
}

function toBooking(doc: BookingDocument): Booking {
  const { _id, createdAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    createdAt: createdAt.toISOString(),
  };
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  const db = await getDb();
  const doc: Omit<BookingDocument, "_id"> = {
    ...input,
    status: "pending",
    createdAt: new Date(),
  };

  const result = await db
    .collection<BookingDocument>("bookings")
    .insertOne(doc as BookingDocument);

  return toBooking({ ...doc, _id: result.insertedId } as BookingDocument);
}

// For the future admin "Bookings" page (already listed, disabled, in the
// sidebar under Contacts) — not wired to any UI yet, just here so that
// page doesn't need a separate trip back to this file to add it later.
export async function getAllBookings(): Promise<Booking[]> {
  const db = await getDb();
  const docs = await db
    .collection<BookingDocument>("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toBooking);
}
