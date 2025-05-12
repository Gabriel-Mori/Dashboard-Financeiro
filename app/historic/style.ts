import styled from "styled-components";

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f1f5f9;
`;

export const DashboardContent = styled.main`
  padding: 1.5rem;
  margin-left: 0;

  @media (min-width: 769px) {
    margin-left: 250px;
    padding: 2rem;
  }
`;

export const DashboardHeader = styled.header`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const PageDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;
