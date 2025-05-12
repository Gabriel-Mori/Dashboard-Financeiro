import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 100px;
  background-color: blue;
`;

export const PaginationHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px; /* Ajuste o espaço entre os botões de paginação */
  padding: 0 16px; /* Pode ajustar esse valor conforme necessário */
  width: 100px;
`;

export const PaginationItem = styled.div`
  padding: 6px 12px;
  cursor: pointer;
  background-color: #f9fafb;
  border-radius: 8px;
  font-weight: 600;
  color: #6b7280;

  &:hover {
    background-color: #e5e7eb;
  }

  &.active {
    background-color: #4caf50;
    color: white;
  }
`;

export const PaginationLink = styled.span`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  border-radius: 6px;
  background-color: #f1f5f9;

  &:hover {
    background-color: #e5e7eb;
  }
`;
