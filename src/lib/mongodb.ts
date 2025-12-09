import { MongoClient } from "mongodb";

/**
 * MongoDB Connection Utility
 *
 * Provides a cached MongoDB client connection for the application
 * Uses connection pooling and caching to optimize performance
 *
 * Features:
 * - Connection caching to avoid multiple connections
 * - Environment-based configuration
 * - Error handling and logging
 * - TypeScript support
 */

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/safetrip";
const MONGODB_DB = process.env.MONGODB_DB || "InfosecCluster";

// Global variable to cache the MongoDB client
let cachedClient: MongoClient | null = null;

/**
 * Connect to MongoDB with caching
 * Returns a cached client if available, otherwise creates a new connection
 *
 * @returns Promise<MongoClient> - MongoDB client instance
 * @throws Error if connection fails
 */
export async function connectToDatabase(): Promise<MongoClient> {
  // Return cached client if it exists and is connected
  if (cachedClient && cachedClient) {
    try {
      // Ping the database to ensure connection is still alive
      await cachedClient.db(MONGODB_DB).admin().ping();
      return cachedClient;
    } catch (error) {
      console.warn("Cached MongoDB client is stale, creating new connection");
      cachedClient = null;
    }
  }

  try {
    // Create new MongoDB client
    const client = new MongoClient(MONGODB_URI, {
      // Connection options for better performance and reliability
      maxPoolSize: 10, // Maximum number of connections in the connection pool
      serverSelectionTimeoutMS: 5000, // How long to wait for server selection
      socketTimeoutMS: 45000, // How long to wait for socket operations
    });

    // Connect to MongoDB
    await client.connect();

    // Cache the client for future use
    cachedClient = client;

    console.log("Successfully connected to MongoDB");

    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
}

/**
 * Get MongoDB client promise (for NextAuth adapter)
 * This is a compatibility function for NextAuth MongoDB adapter
 *
 * @returns Promise<MongoClient> - MongoDB client promise
 */
const clientPromise = connectToDatabase();

export default clientPromise;

/**
 * Get database instance
 * Convenience function to get the database directly
 *
 * @returns Promise<Db> - MongoDB database instance
 */
export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(MONGODB_DB);
}
