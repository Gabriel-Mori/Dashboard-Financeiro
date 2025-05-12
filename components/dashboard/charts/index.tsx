"use client";

import {useEffect, useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import {Bar, Line} from "react-chartjs-2";
import {ChartsContainer, ChartCard, ChartTitle} from "./style";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
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
};

export default function Charts({monthlyData, industryData}: ChartProps) {
  const [barData, setBarData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const [lineData, setLineData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setBarData({
      labels: industryData.labels,
      datasets: [
        {
          label: "Receitas",
          data: industryData.deposits,
          backgroundColor: "rgba(8, 145, 178, 0.7)",
          borderColor: "rgba(8, 145, 178, 1)",
          borderWidth: 1,
        },
        {
          label: "Despesas",
          data: industryData.withdraws,
          backgroundColor: "rgba(190, 18, 60, 0.7)",
          borderColor: "rgba(190, 18, 60, 1)",
          borderWidth: 1,
        },
      ],
    });

    setLineData({
      labels: monthlyData.labels,
      datasets: [
        {
          label: "Receitas",
          data: monthlyData.deposits,
          borderColor: "rgba(8, 145, 178, 1)",
          backgroundColor: "rgba(8, 145, 178, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Despesas",
          data: monthlyData.withdraws,
          borderColor: "rgba(190, 18, 60, 1)",
          backgroundColor: "rgba(190, 18, 60, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    });
  }, [monthlyData, industryData]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartsContainer>
      <ChartCard>
        <ChartTitle>Transações por Mês</ChartTitle>
        <div style={{height: "300px"}}>
          <Line data={lineData} options={lineOptions} />
        </div>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Transações por Indústria</ChartTitle>
        <div style={{height: "300px"}}>
          <Bar data={barData} options={barOptions} />
        </div>
      </ChartCard>
    </ChartsContainer>
  );
}
