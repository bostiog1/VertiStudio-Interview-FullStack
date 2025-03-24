import { Database } from "bun:sqlite";
import { seedDatabase } from "./seed";
import { initializeSchema } from "./schema";

export function initializeDatabase() {
  const db = new Database("mydb.sqlite"); // Use a file-based database instead of in-memory
  initializeSchema(db); // Ensure tables exist

  seedDatabase(db, {
    clientCount: 30,
    bitSlowCount: 20,
    transactionCount: 50,
    clearExisting: false, // Don't clear existing data
    forceSeed: false, // Only seed if the database is empty
  });
  return db;
}
