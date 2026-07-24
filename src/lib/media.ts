import { ObjectId } from "mongodb";
import { getDb } from "./db/mongodb";

export interface MediaInput {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  label: string;
  folder: string;
}

export interface MediaItem extends MediaInput {
  id: string;
  createdAt: string;
}

// A concrete ObjectId type (rather than a vague custom shape) is what
// keeps MongoDB's TypeScript inference well-behaved — see the note in
// lib/bookings.ts / lib/site-config.ts for why a loosely-typed _id can
// silently resolve to `never`.
interface MediaDocument extends MediaInput {
  _id: ObjectId;
  createdAt: Date;
}

function toMediaItem(doc: MediaDocument): MediaItem {
  const { _id, createdAt, ...rest } = doc;
  return { ...rest, id: _id.toString(), createdAt: createdAt.toISOString() };
}

function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new Error("Invalid media id.");
  return new ObjectId(id);
}

export async function createMedia(input: MediaInput): Promise<MediaItem> {
  const db = await getDb();
  const doc: Omit<MediaDocument, "_id"> = { ...input, createdAt: new Date() };
  const result = await db
    .collection<MediaDocument>("media")
    .insertOne(doc as MediaDocument);
  return toMediaItem({ ...doc, _id: result.insertedId } as MediaDocument);
}

export async function getAllMedia(): Promise<MediaItem[]> {
  const db = await getDb();
  const docs = await db
    .collection<MediaDocument>("media")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(toMediaItem);
}

export async function getMediaById(id: string): Promise<MediaItem | null> {
  const db = await getDb();
  const doc = await db
    .collection<MediaDocument>("media")
    .findOne({ _id: toObjectId(id) });
  return doc ? toMediaItem(doc) : null;
}

export async function deleteMediaRecord(id: string): Promise<void> {
  const db = await getDb();
  await db
    .collection<MediaDocument>("media")
    .deleteOne({ _id: toObjectId(id) });
}
