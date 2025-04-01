// services/transactionService.ts
import Endpoints from "../utils/Endpoints";

export interface Transaction {
  id: number;
  coin_id: number;
  amount: number;
  transaction_date: string;
  seller_id: number | null;
  seller_name: string | null;
  buyer_id: number;
  buyer_name: string;
  bit1: number;
  bit2: number;
  bit3: number;
  value: number;
  computedBitSlow: string;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(Endpoints.transactions, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
