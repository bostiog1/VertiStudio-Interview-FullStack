import { serve } from "bun";
import index from "../index.html";
import { initializeDatabase } from "./db";
import { getTransactions } from "./api/transactions";

// Initialize the database
const db = initializeDatabase();

const server = serve({
  routes: {
    "/*": index,
    "/api/transactions": getTransactions(db),
  },
  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
