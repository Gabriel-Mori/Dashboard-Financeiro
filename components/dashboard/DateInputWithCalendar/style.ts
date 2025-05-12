import {PopoverContent} from "@/components/ui/popover";
import styled from "styled-components";

export const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

export const DateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const PopoverContentWrapper = styled(PopoverContent)`
  width: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputStyled = styled.input`
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.2);
  }
`;
