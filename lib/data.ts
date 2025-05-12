import {Transaction} from "@/types/transaction";
import transactionsData from "../transactions.json";

export const transactions: Transaction[] = transactionsData as Transaction[];

export function getUniqueIndustries(): string[] {
  return [...new Set(transactions.map((t) => t.industry))].sort();
}

export function getUniqueStates(): string[] {
  return [...new Set(transactions.map((t) => t.state))].sort();
}
