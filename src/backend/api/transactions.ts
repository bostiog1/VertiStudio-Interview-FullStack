import { Database } from "bun:sqlite";
import { computeBitSlow } from "./bitslow";

export function getTransactions(db: Database) {
  return () => {
    try {
      const transactions = db
        .query(
          `
          SELECT 
            t.id, 
            t.coin_id, 
            t.amount, 
            t.transaction_date,
            seller.id as seller_id,
            seller.name as seller_name,
            buyer.id as buyer_id,
            buyer.name as buyer_name,
            c.bit1,
            c.bit2,
            c.bit3,
            c.value
          FROM transactions t
          LEFT JOIN clients seller ON t.seller_id = seller.id
          JOIN clients buyer ON t.buyer_id = buyer.id
          JOIN coins c ON t.coin_id = c.coin_id
          ORDER BY t.transaction_date DESC
        `
        )
        .all();

      const enhancedTransactions = transactions.map((transaction) => ({
        ...transaction,
        computedBitSlow: computeBitSlow(
          transaction.bit1,
          transaction.bit2,
          transaction.bit3
        ),
      }));

      return Response.json(enhancedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return new Response("Error fetching transactions", { status: 500 });
    }
  };
}
