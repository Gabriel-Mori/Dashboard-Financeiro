// components/dashboard/DateInputWithCalendar/DateInputWithCalendar.tsx
import {useState} from "react";
import {format, isValid, parse} from "date-fns";
import {ptBR} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";

import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  DateButton,
  DateInputWrapper,
  Label,
  PopoverContentWrapper,
  InputStyled,
} from "./style"; // Importando os estilos
import {formatMask} from "@/utils/formatMask";

type Props = {
  label: string;
  date?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
};

export function DateInputWithCalendar({
  label,
  date,
  onChange,
  placeholder,
}: Props) {
  const [inputValue, setInputValue] = useState(() =>
    date ? format(date, "dd/MM/yyyy") : ""
  );

  const handleInputChange = (value: string) => {
    const formattedValue = formatMask(value);
    setInputValue(formattedValue);
    const parsed = parse(formattedValue, "dd/MM/yyyy", new Date());
    if (isValid(parsed)) onChange(parsed);
  };

  return (
    <DateInputWrapper>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <DateButton>
            <CalendarIcon size={16} />
            {date
              ? format(date, "dd/MM/yyyy")
              : placeholder || "Selecionar data"}
          </DateButton>
        </PopoverTrigger>
        <PopoverContentWrapper>
          <InputStyled
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="dd/mm/aaaa"
          />
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selected) => {
              if (selected) {
                setInputValue(format(selected, "dd/MM/yyyy"));
                onChange(selected);
              }
            }}
            locale={ptBR}
            initialFocus
          />
        </PopoverContentWrapper>
      </Popover>
    </DateInputWrapper>
  );
}
