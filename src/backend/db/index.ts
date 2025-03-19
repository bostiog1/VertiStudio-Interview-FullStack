import { Database } from "bun:sqlite";
import { seedDatabase } from "./seed";

export function initializeDatabase() {
  const db = new Database(":memory:");
  seedDatabase(db, {
    clientCount: 30,
    bitSlowCount: 20,
    transactionCount: 50,
    clearExisting: true,
  });
  return db;
}
