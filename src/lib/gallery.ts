import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface GalleryItemInput {
  imageUrl: string;
  caption: string;
}

export interface GalleryItem extends GalleryItemInput {
  id: string;
  order: number;
  createdAt: string;
}

// A concrete ObjectId type (rather than a vague custom shape) is what
// keeps MongoDB's TypeScript inference well-behaved — see the note in
// lib/bookings.ts / lib/site-config.ts for why a loosely-typed _id can
// silently resolve to `never`.
interface GalleryItemDocument extends GalleryItemInput {
  _id: ObjectId;
  order: number;
  createdAt: Date;
}

function toGalleryItem(doc: GalleryItemDocument): GalleryItem {
  const { _id, createdAt, ...rest } = doc;
  return { ...rest, id: _id.toString(), createdAt: createdAt.toISOString() };
}

function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new Error("Invalid gallery item id.");
  return new ObjectId(id);
}

function galleryCollection() {
  return getDb().then((db) =>
    db.collection<GalleryItemDocument>("galleryItems"),
  );
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const collection = await galleryCollection();
  const docs = await collection.find({}).sort({ order: 1 }).toArray();
  return docs.map(toGalleryItem);
}

export async function createGalleryItem(
  input: GalleryItemInput,
): Promise<GalleryItem> {
  const collection = await galleryCollection();

  // New items go to the end of the current order — find the current
  // max and add one, rather than requiring the caller to know it.
  const last = await collection.find({}).sort({ order: -1 }).limit(1).toArray();
  const nextOrder = last.length > 0 ? last[0].order + 1 : 0;

  const doc: Omit<GalleryItemDocument, "_id"> = {
    ...input,
    order: nextOrder,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(doc as GalleryItemDocument);
  return toGalleryItem({
    ...doc,
    _id: result.insertedId,
  } as GalleryItemDocument);
}

export async function updateGalleryItemCaption(
  id: string,
  caption: string,
): Promise<GalleryItem> {
  const collection = await galleryCollection();
  const result = await collection.findOneAndUpdate(
    { _id: toObjectId(id) },
    { $set: { caption } },
    { returnDocument: "after" },
  );
  if (!result) throw new Error("Gallery item not found.");
  return toGalleryItem(result);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const collection = await galleryCollection();
  await collection.deleteOne({ _id: toObjectId(id) });
}

// Swaps this item's order with its immediate neighbor in the given
// direction. If it's already at that edge (first item moving "up", or
// last item moving "down"), this is a harmless no-op rather than an
// error — the UI just disables those buttons at the edges anyway.
export async function moveGalleryItem(
  id: string,
  direction: "up" | "down",
): Promise<void> {
  const collection = await galleryCollection();
  const items = await collection.find({}).sort({ order: 1 }).toArray();
  const index = items.findIndex((item) => item._id.toString() === id);
  if (index === -1) throw new Error("Gallery item not found.");

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= items.length) return;

  const current = items[index];
  const neighbor = items[swapIndex];

  await collection.updateOne(
    { _id: current._id },
    { $set: { order: neighbor.order } },
  );
  await collection.updateOne(
    { _id: neighbor._id },
    { $set: { order: current.order } },
  );
}
