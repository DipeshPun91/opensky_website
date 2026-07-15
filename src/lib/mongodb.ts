import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "opensky";

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Add it to .env.local.",
  );
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// In dev, Next.js hot-reloads modules on every save, which would open a
// brand new MongoClient (and a brand new connection pool) each time
// unless we stash the in-flight connection promise on the global object.
// This is the same pattern MongoDB's own Next.js integration docs use.
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri as string);
      global._mongoClientPromise = client.connect();
    }
    cachedClient = await global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri as string);
    cachedClient = await client.connect();
  }

  return cachedClient;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = await getClient();
  cachedDb = client.db(dbName);
  return cachedDb;
}
