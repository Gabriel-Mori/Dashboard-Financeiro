"use client";

import {ArrowDownCircle, ArrowUpCircle} from "lucide-react";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {
  TableContainer,
  TableHeader,
  TableTitle,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TransactionAmount,
  TransactionType,
  EmptyState,
} from "./style";

type TransactionsTableProps = {
  transactions: Transaction[];
};
import Paginate from "../../pagination/pagination";
import {useMemo, useState} from "react";
import {Transaction} from "@/types/transaction";
import {formatAmount} from "@/service/dashboard-service";

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const totalPages = useMemo(
    () => Math.ceil(transactions.length / ITEMS_PER_PAGE),
    [transactions.length]
  );

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return transactions.slice(startIndex, endIndex);
  }, [currentPage, transactions]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

  const formatDate = (timestamp: number) =>
    format(new Date(timestamp), "dd MMM yyyy", {locale: ptBR});

  return (
    <TableContainer>
      <TableHeader>
        <TableTitle>Histórico de Transações</TableTitle>
      </TableHeader>

      {paginatedTransactions.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <tr>
                <TableHeadCell>Data</TableHeadCell>
                <TableHeadCell>Conta</TableHeadCell>
                <TableHeadCell>Indústria</TableHeadCell>
                <TableHeadCell>Estado</TableHeadCell>
                <TableHeadCell>Tipo</TableHeadCell>
                <TableHeadCell>Valor</TableHeadCell>
              </tr>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell>{transaction.industry}</TableCell>
                  <TableCell>{transaction.state}</TableCell>
                  <TableCell>
                    <TransactionType type={transaction.transaction_type}>
                      {transaction.transaction_type === "deposit"
                        ? "Receita"
                        : "Despesa"}
                    </TransactionType>
                  </TableCell>
                  <TableCell>
                    <TransactionAmount type={transaction.transaction_type}>
                      {transaction.transaction_type === "deposit" ? (
                        <ArrowUpCircle size={16} />
                      ) : (
                        <ArrowDownCircle size={16} />
                      )}
                      {formatCurrency(formatAmount(transaction.amount))}
                    </TransactionAmount>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyState>
          Nenhuma transação encontrada para os filtros selecionados.
        </EmptyState>
      )}
    </TableContainer>
  );
}
