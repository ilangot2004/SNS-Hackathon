// NOTE: MongoDB client-side connections are not recommended for production.
// This utility is for reference. You'll need to create a backend API (Node.js/Express)
// to interact with MongoDB. The connection string is stored here for reference.
// TODO: Create backend API endpoints and use fetch/axios to call them from React components.

import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://ilangot2004_db_user:Ilango@12345@freecluster.wvjlbdn.mongodb.net/?appName=FreeCluster';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper function to get database
export async function getDatabase(dbName = 'globaltrotter') {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper functions for common operations
export async function getCollection(collectionName, dbName = 'globaltrotter') {
  const db = await getDatabase(dbName);
  return db.collection(collectionName);
}

