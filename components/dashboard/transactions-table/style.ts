import styled from "styled-components";

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding-bottom: 10px;
`;

export const TableHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableHeadCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:last-child {
    text-align: right;
  }
`;

export const TableBody = styled.tbody`
  border-bottom: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    text-align: right;
  }
`;

export const TransactionAmount = styled.div<{type: "deposit" | "withdraw"}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => (props.type === "deposit" ? "#047857" : "#be123c")};
  font-weight: 500;
`;

export const TransactionType = styled.div<{type: "deposit" | "withdraw"}>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.type === "deposit"
      ? "rgba(4, 120, 87, 0.1)"
      : "rgba(190, 18, 60, 0.1)"};
  color: ${(props) => (props.type === "deposit" ? "#047857" : "#be123c")};
`;

export const EmptyState = styled.div`
  padding: 3rem 1.5rem;
  text-align: center;
  color: #6b7280;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  background-color: red;
`;
