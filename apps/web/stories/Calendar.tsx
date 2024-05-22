import { addDays, format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/solid";
import {
  Button,
  DatePicker,
  DatePickerRange,
  Calendar as PolkadexCalendar,
  Typography,
} from "@polkadex/ux";
import type { DateRange } from "@polkadex/ux";
import { useMemo, useState } from "react";

export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRanger, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const message = useMemo(
    () => (date ? format(date as Date, "PPP") : "Pick a date"),
    [date]
  );

  return (
    <div className="flex flex-col gap-4">
      <DatePicker date={date} setDate={setDate}>
        <Button.Outline appearance="tertiary">
          <CalendarIcon className="w-4 h-4" />
          <Typography.Text>{message}</Typography.Text>
        </Button.Outline>
      </DatePicker>
      <DatePickerRange date={dateRanger} setDate={setDateRange}>
        <Button.Outline appearance="secondary">
          <CalendarIcon className="w-4 h-4" />
          {dateRanger?.from ? (
            dateRanger.to ? (
              <>
                {format(dateRanger.from, "LLL dd, y")} -{" "}
                {format(dateRanger.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRanger.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button.Outline>
      </DatePickerRange>
      {/* <PolkadexCalendar
        selected={date}
        mode="single"
        onSelect={(e) => setDate(e)}
        initialFocus
      /> */}
      <PolkadexCalendar
        initialFocus
        mode="range"
        defaultMonth={dateRanger?.from}
        selected={dateRanger}
        onSelect={setDateRange}
        numberOfMonths={2}
      />
    </div>
  );
};
