"use client";

import {useState, useEffect} from "react";
import {useFilters} from "@/contexts/filter-context";
import {getUniqueIndustries, getUniqueStates} from "@/lib/data";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {FilterX} from "lucide-react";

import {
  FiltersContainer,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  FiltersHeader,
  FiltersTitle,
} from "./style";

import {DateInputWithCalendar} from "../DateInputWithCalendar/DateInputWithCalendar";

export default function Filters() {
  const {filters, setDateRange, setIndustries, setStates, resetFilters} =
    useFilters();

  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.dateRange.startDate
      ? new Date(filters.dateRange.startDate)
      : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    filters.dateRange.endDate ? new Date(filters.dateRange.endDate) : undefined
  );

  const industries = getUniqueIndustries();
  const states = getUniqueStates();

  useEffect(() => {
    const newStartDate = startDate ? startDate.toISOString() : null;
    const newEndDate = endDate ? endDate.toISOString() : null;

    if (
      newStartDate !== filters.dateRange.startDate ||
      newEndDate !== filters.dateRange.endDate
    ) {
      setDateRange(newStartDate, newEndDate);
    }
  }, [startDate, endDate, setDateRange, filters.dateRange]);

  const handleIndustryChange = (value: string) => {
    setIndustries(value === "all" ? [] : [value]);
  };

  const handleStateChange = (value: string) => {
    setStates(value === "all" ? [] : [value]);
  };

  const handleResetFilters = () => {
    resetFilters();
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersTitle>Filtros</FiltersTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="flex items-center gap-1"
        >
          <FilterX size={16} />
          Limpar filtros
        </Button>
      </FiltersHeader>

      <FiltersGrid>
        <FilterGroup>
          <DateInputWithCalendar
            label="Data Inicial"
            date={startDate}
            onChange={setStartDate}
            placeholder="Selecionar data"
          />
        </FilterGroup>

        <FilterGroup>
          <DateInputWithCalendar
            label="Data Final"
            date={endDate}
            onChange={setEndDate}
            placeholder="Selecionar data"
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Indústria</FilterLabel>
          <Select
            value={
              filters.industries.length > 0 ? filters.industries[0] : "all"
            }
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas as indústrias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as indústrias</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Estado</FilterLabel>
          <Select
            value={filters.states.length > 0 ? filters.states[0] : "all"}
            onValueChange={handleStateChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos os estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterGroup>
      </FiltersGrid>
    </FiltersContainer>
  );
}
