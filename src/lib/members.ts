import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface MemberInput {
  name: string;
  role: string;
  bio: string;
  image: string;
  facebook: string;
  instagram: string;
}

export interface Member extends MemberInput {
  id: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// A concrete ObjectId type (rather than a vague custom shape) is what
// keeps MongoDB's TypeScript inference well-behaved — see the note in
// lib/bookings.ts / lib/site-config.ts for why a loosely-typed _id can
// silently resolve to `never`.
interface MemberDocument extends MemberInput {
  _id: ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

function toMember(doc: MemberDocument): Member {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new Error("Invalid member id.");
  return new ObjectId(id);
}

function membersCollection() {
  return getDb().then((db) => db.collection<MemberDocument>("members"));
}

export async function getAllMembers(): Promise<Member[]> {
  const collection = await membersCollection();
  const docs = await collection.find({}).sort({ order: 1 }).toArray();
  return docs.map(toMember);
}

export async function getMemberById(id: string): Promise<Member | null> {
  const collection = await membersCollection();
  const doc = await collection.findOne({ _id: toObjectId(id) });
  return doc ? toMember(doc) : null;
}

export async function createMember(input: MemberInput): Promise<Member> {
  const collection = await membersCollection();

  const last = await collection.find({}).sort({ order: -1 }).limit(1).toArray();
  const nextOrder = last.length > 0 ? last[0].order + 1 : 0;

  const now = new Date();
  const doc: Omit<MemberDocument, "_id"> = {
    ...input,
    order: nextOrder,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(doc as MemberDocument);
  return toMember({ ...doc, _id: result.insertedId } as MemberDocument);
}

export async function updateMember(
  id: string,
  input: MemberInput,
): Promise<Member> {
  const collection = await membersCollection();
  const result = await collection.findOneAndUpdate(
    { _id: toObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
  if (!result) throw new Error("Member not found.");
  return toMember(result);
}

export async function deleteMember(id: string): Promise<void> {
  const collection = await membersCollection();
  await collection.deleteOne({ _id: toObjectId(id) });
}

// Swaps this member's order with its immediate neighbor. If already at
// that edge, this is a harmless no-op — the UI disables those buttons
// at the edges anyway.
export async function moveMember(
  id: string,
  direction: "up" | "down",
): Promise<void> {
  const collection = await membersCollection();
  const members = await collection.find({}).sort({ order: 1 }).toArray();
  const index = members.findIndex((m) => m._id.toString() === id);
  if (index === -1) throw new Error("Member not found.");

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= members.length) return;

  const current = members[index];
  const neighbor = members[swapIndex];

  await collection.updateOne(
    { _id: current._id },
    { $set: { order: neighbor.order } },
  );
  await collection.updateOne(
    { _id: neighbor._id },
    { $set: { order: current.order } },
  );
}
