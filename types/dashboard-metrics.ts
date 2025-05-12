import {Transaction} from "@/lib/data";

export type Filters = {
  dateRange: {startDate: string | null; endDate: string | null};
  accounts: string[];
  industries: string[];
  states: string[];
};

export type DashboardMetrics = {
  balance: number;
  income: number;
  expenses: number;
  pending: number;
  monthlyData: {
    labels: string[];
    deposits: number[];
    withdraws: number[];
  };
  industryData: {
    labels: string[];
    deposits: number[];
    withdraws: number[];
  };
  filteredTransactions: Transaction[];
};
