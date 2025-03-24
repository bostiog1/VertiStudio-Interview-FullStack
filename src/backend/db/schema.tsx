import { Database } from "bun:sqlite";
export function initializeSchema(db: Database) {
  console.log("📝 Creating tables if they don't exist...");

  db.exec(`
    -- Create clients table
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      password TEXT, -- Added for authentication
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create coins table
    CREATE TABLE IF NOT EXISTS coins (
      coin_id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_id INTEGER,
      bit1 INTEGER NOT NULL,
      bit2 INTEGER NOT NULL,
      bit3 INTEGER NOT NULL,
      value REAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients (id)
    );

    -- Create transactions table
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      coin_id INTEGER NOT NULL,
      seller_id INTEGER,
      buyer_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (coin_id) REFERENCES coins (coin_id),
      FOREIGN KEY (seller_id) REFERENCES clients (id),
      FOREIGN KEY (buyer_id) REFERENCES clients (id)
    );
  `);
}
