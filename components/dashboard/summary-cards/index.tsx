"use client";

import {ArrowDownCircle, ArrowUpCircle, Clock, Wallet} from "lucide-react";
import {
  CardsGrid,
  Card,
  CardHeader,
  CardTitle,
  CardIcon,
  CardValue,
  CardFooter,
} from "./style";
import {formatCurrency} from "@/utils/formatMask";

type SummaryCardsProps = {
  balance: number;
  income: number;
  expenses: number;
  pending: number;
};

export default function SummaryCards({
  balance,
  income,
  expenses,
  pending,
}: SummaryCardsProps) {
  return (
    <CardsGrid>
      <Card>
        <CardHeader>
          <CardTitle>Saldo Total</CardTitle>
          <CardIcon color="#047857">
            <Wallet size={20} />
          </CardIcon>
        </CardHeader>
        <CardValue>{formatCurrency(balance)}</CardValue>
        <CardFooter>Atualizado agora</CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Receitas</CardTitle>
          <CardIcon color="#0891b2">
            <ArrowUpCircle size={20} />
          </CardIcon>
        </CardHeader>
        <CardValue>{formatCurrency(income)}</CardValue>
        <CardFooter>Total de entradas</CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Despesas</CardTitle>
          <CardIcon color="#be123c">
            <ArrowDownCircle size={20} />
          </CardIcon>
        </CardHeader>
        <CardValue>{formatCurrency(expenses)}</CardValue>
        <CardFooter>Total de saídas</CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transações Pendentes</CardTitle>
          <CardIcon color="#d97706">
            <Clock size={20} />
          </CardIcon>
        </CardHeader>
        <CardValue>{formatCurrency(pending)}</CardValue>
        <CardFooter>Aguardando processamento</CardFooter>
      </Card>
    </CardsGrid>
  );
}
