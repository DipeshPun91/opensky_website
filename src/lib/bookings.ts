import { ObjectId } from "mongodb";
import { getDb } from "./db/mongodb";

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

function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid booking id.");
  }
  return new ObjectId(id);
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

export async function getAllBookings(): Promise<Booking[]> {
  const db = await getDb();
  const docs = await db
    .collection<BookingDocument>("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toBooking);
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<Booking> {
  const db = await getDb();
  const result = await db
    .collection<BookingDocument>("bookings")
    .findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: { status } },
      { returnDocument: "after" },
    );

  if (!result) throw new Error("Booking not found.");
  return toBooking(result);
}

export async function deleteBooking(id: string): Promise<void> {
  const db = await getDb();
  await db.collection<BookingDocument>("bookings").deleteOne({
    _id: toObjectId(id),
  });
}
