import {DashboardMetrics, Filters} from "@/types/dashboard-metrics";
import {Transaction} from "@/types/transaction";
import {transactions} from "@/lib/data";

export function getDashboardMetrics(filters: Filters): DashboardMetrics {
  const startDate = filters.dateRange.startDate
    ? new Date(filters.dateRange.startDate)
    : null;
  const endDate = filters.dateRange.endDate
    ? new Date(filters.dateRange.endDate)
    : null;

  const transactions = filterTransactions({
    startDate,
    endDate,
    accounts: filters.accounts,
    industries: filters.industries,
    states: filters.states,
  });

  return {
    filteredTransactions: transactions,
    balance: calculateBalance(transactions),
    income: calculateTotalDeposits(transactions),
    expenses: calculateTotalWithdraws(transactions),
    pending: calculatePendingTransactions(transactions),
    monthlyData: getTransactionsByMonth(transactions),
    industryData: getTransactionsByIndustry(transactions),
  };
}

export function filterTransactions(filters: {
  startDate?: Date | null;
  endDate?: Date | null;
  accounts?: string[];
  industries?: string[];
  states?: string[];
}): Transaction[] {
  return transactions.filter((transaction) => {
    if (filters.startDate && new Date(transaction.date) < filters.startDate) {
      return false;
    }
    if (filters.endDate) {
      const endOfDay = new Date(filters.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (new Date(transaction.date) > endOfDay) {
        return false;
      }
    }

    if (
      filters.accounts &&
      filters.accounts.length > 0 &&
      !filters.accounts.includes(transaction.account)
    ) {
      return false;
    }

    if (
      filters.industries &&
      filters.industries.length > 0 &&
      !filters.industries.includes(transaction.industry)
    ) {
      return false;
    }

    if (
      filters.states &&
      filters.states.length > 0 &&
      !filters.states.includes(transaction.state)
    ) {
      return false;
    }

    return true;
  });
}

export function formatAmount(amount: string): number {
  return Number.parseFloat(amount) / 100;
}

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((total, transaction) => {
    const amount = formatAmount(transaction.amount);
    return transaction.transaction_type === "deposit"
      ? total + amount
      : total - amount;
  }, 0);
}

export function calculateTotalDeposits(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.transaction_type === "deposit")
    .reduce((total, t) => total + formatAmount(t.amount), 0);
}

export function calculateTotalWithdraws(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.transaction_type === "withdraw")
    .reduce((total, t) => total + formatAmount(t.amount), 0);
}

export function calculatePendingTransactions(
  transactions: Transaction[]
): number {
  const sortedTransactions = [...transactions].sort((a, b) => b.date - a.date);
  const pendingCount = Math.ceil(sortedTransactions.length * 0.1);

  return sortedTransactions
    .slice(0, pendingCount)
    .reduce((total, t) => total + formatAmount(t.amount), 0);
}

export function getTransactionsByMonth(transactions: Transaction[]): {
  labels: string[];
  deposits: number[];
  withdraws: number[];
} {
  const monthlyData: Record<string, {deposits: number; withdraws: number}> = {};

  transactions.forEach(({date, amount, transaction_type}) => {
    const monthKey = formatMonthKey(new Date(date));

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {deposits: 0, withdraws: 0};
    }

    const parsedAmount = parseFloat(amount);
    if (transaction_type === "deposit") {
      monthlyData[monthKey].deposits += parsedAmount;
    } else if (transaction_type === "withdraw") {
      monthlyData[monthKey].withdraws += parsedAmount;
    }
  });

  const sortedMonths = Object.keys(monthlyData).sort();

  return {
    labels: sortedMonths.map(formatMonthLabel),
    deposits: sortedMonths.map((month) => monthlyData[month].deposits),
    withdraws: sortedMonths.map((month) => monthlyData[month].withdraws),
  };
}

function formatMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
}

function formatMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  return `${month}/${year.slice(2)}`;
}

export function getTransactionsByIndustry(transactions: Transaction[]): {
  labels: string[];
  deposits: number[];
  withdraws: number[];
} {
  const industryData: Record<string, {deposits: number; withdraws: number}> =
    {};

  transactions.forEach((transaction) => {
    if (!industryData[transaction.industry]) {
      industryData[transaction.industry] = {deposits: 0, withdraws: 0};
    }

    const amount = formatAmount(transaction.amount);
    if (transaction.transaction_type === "deposit") {
      industryData[transaction.industry].deposits += amount;
    } else {
      industryData[transaction.industry].withdraws += amount;
    }
  });

  const industries = Object.keys(industryData);

  return {
    labels: industries,
    deposits: industries.map((industry) => industryData[industry].deposits),
    withdraws: industries.map((industry) => industryData[industry].withdraws),
  };
}
