"use client";

import { ReactNode } from "react";
import { DateRange } from "react-day-picker";

import { Popover } from "./popover";
import { Calendar } from "./calendar";

function DatePicker({
  date,
  setDate,
  children,
}: {
  date?: Date;
  setDate: (date?: Date) => void;
  children: ReactNode;
}) {
  return (
    <Popover>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content className="w-auto p-0 bg-level-1 m-1" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => setDate(e)}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
}

function DatePickerRange({
  date,
  setDate,
  children,
}: {
  date?: DateRange;
  setDate: (date?: DateRange) => void;
  children: ReactNode;
}) {
  return (
    <Popover>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content className="w-auto p-0 bg-level-1 m-1" align="center">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </Popover.Content>
    </Popover>
  );
}

export { DatePicker, DatePickerRange };
