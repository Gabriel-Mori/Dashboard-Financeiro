"use client";

import TransactionsTable from "@/components/dashboard/transactions-table";
import {useFilters} from "@/contexts/filter-context";
import {getDashboardMetrics} from "@/service/dashboard-service";
import {
  DashboardContainer,
  DashboardContent,
  DashboardHeader,
  PageDescription,
  PageTitle,
} from "./style";
import Sidebar from "@/components/dashboard/sidebar";
import Filters from "@/components/dashboard/filters";
import {useState} from "react";
import {useEffect} from "react";
import {Transaction} from "@/types/transaction";

const HistoricTransaction = () => {
  const {filters} = useFilters();
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const fetchData = async () => {
    const {filteredTransactions} = await getDashboardMetrics(filters);
    setFilteredTransactions(filteredTransactions);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <DashboardContainer>
      <Sidebar />

      <DashboardContent>
        <DashboardHeader>
          <PageTitle>Dashboard Financeiro</PageTitle>
          <PageDescription>
            Visualize e analise suas transações financeiras
          </PageDescription>
        </DashboardHeader>
        <Filters />
        <TransactionsTable transactions={filteredTransactions} />
      </DashboardContent>
    </DashboardContainer>
  );
};

export default HistoricTransaction;
