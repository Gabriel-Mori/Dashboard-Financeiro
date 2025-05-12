"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contexts/auth-context";
import {useFilters} from "@/contexts/filter-context";
import Sidebar from "@/components/dashboard/sidebar/index";
import Filters from "@/components/dashboard/filters/index";
import SummaryCards from "@/components/dashboard/summary-cards/index";
import Charts from "@/components/dashboard/charts/index";

import {
  DashboardContainer,
  DashboardContent,
  DashboardHeader,
  PageTitle,
  PageDescription,
} from "./style";
import {getDashboardMetrics} from "@/service/dashboard-service";

export default function DashboardPage() {
  const {user, isLoading} = useAuth();
  const {filters} = useFilters();
  const router = useRouter();

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [pending, setPending] = useState(0);
  const [monthlyData, setMonthlyData] = useState({
    labels: [] as string[],
    deposits: [] as number[],
    withdraws: [] as number[],
  });
  const [industryData, setIndustryData] = useState({
    labels: [] as string[],
    deposits: [] as number[],
    withdraws: [] as number[],
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    const {balance, income, expenses, pending, monthlyData, industryData} =
      getDashboardMetrics(filters);

    setBalance(balance);
    setIncome(income);
    setExpenses(expenses);
    setPending(pending);
    setMonthlyData(monthlyData);
    setIndustryData(industryData);
  }, [filters, user]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

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

        <SummaryCards
          balance={balance}
          income={income}
          expenses={expenses}
          pending={pending}
        />

        <Charts monthlyData={monthlyData} industryData={industryData} />
      </DashboardContent>
    </DashboardContainer>
  );
}
