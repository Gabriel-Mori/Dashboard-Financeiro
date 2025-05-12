"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type FilterState = {
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  accounts: string[];
  industries: string[];
  states: string[];
};

type FilterContextType = {
  filters: FilterState;
  setDateRange: (startDate: string | null, endDate: string | null) => void;
  setAccounts: (accounts: string[]) => void;
  setIndustries: (industries: string[]) => void;
  setStates: (states: string[]) => void;
  resetFilters: () => void;
};

const initialFilters: FilterState = {
  dateRange: {
    startDate: null,
    endDate: null,
  },
  accounts: [],
  industries: [],
  states: [],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({children}: {children: ReactNode}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters);
        setFilters(parsedFilters);
      } catch (error) {
        console.error("Erro ao carregar filtros:", error);
        localStorage.removeItem("filters");
      }
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
      localStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters]);

  const setDateRange = (startDate: string | null, endDate: string | null) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {startDate, endDate},
    }));
  };

  const setAccounts = (accounts: string[]) => {
    setFilters((prev) => ({
      ...prev,
      accounts,
    }));
  };

  const setIndustries = (industries: string[]) => {
    setFilters((prev) => ({
      ...prev,
      industries,
    }));
  };

  const setStates = (states: string[]) => {
    setFilters((prev) => ({
      ...prev,
      states,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setDateRange,
        setAccounts,
        setIndustries,
        setStates,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters deve ser usado dentro de um FilterProvider");
  }
  return context;
}
