"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { ComponentProps } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export type CalendarProps = ComponentProps<typeof DayPicker>;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={twMerge("p-3 w-fit", className)}
      classNames={{
        months: "flex space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "border border-secondary hover:bg-level-2 bg-transparent p-1 opacity-50 hover:opacity-100 hover:text-white rounded-sm duration-300 transition-colors",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "opacity-80 rounded-sm w-8 font-normal text-[0.8rem] mb-1",
        row: "flex w-full mt-2",
        cell: twMerge(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-level-4 [&:has([aria-selected].day-outside)]:bg-level-4/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-sm [&:has(>.day-range-start)]:rounded-l-sm first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm"
            : "[&:has([aria-selected])]:rounded-sm"
        ),
        day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-sm hover:bg-level-4",
        day_range_start: "day-range-start aria-selected:bg-primary-base",
        day_range_end: "day-range-end aria-selected:bg-primary-base",
        day_selected:
          "bg-primary-base text-white hover:bg-level-0 hover:text-white focus:bg-primary-base focus:text-white",
        day_today: "bg-level-4",
        day_outside:
          "day-outside text-secondary aria-selected:!bg-level-4/50 aria-selected:text-white/50 aria-selected:opacity-30",
        day_disabled: "opacity-50",
        day_range_middle:
          "aria-selected:text-white/70 aria-selected:bg-level-2",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <RiArrowLeftSLine className="h-4 w-4" />,
        IconRight: () => <RiArrowRightSLine className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};

export { Calendar };
export type { DateRange };
