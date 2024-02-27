"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
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
        nav_button: twMerge(
          "border border-level-4 bg-white shadow-sm hover:bg-level-2",
          "bg-transparent p-1 opacity-50 hover:opacity-100 rounded-md"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "opacity-80 rounded-md w-8 font-normal text-[0.8rem] mb-1",
        row: "flex w-full mt-2",
        cell: twMerge(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-level-4 [&:has([aria-selected].day-outside)]:bg-level-4/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: twMerge(
          "hover:bg-level-4",
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-white text-black hover:!bg-white hover:!text-black focus:bg-white",
        day_today: "bg-level-4",
        day_outside:
          "day-outside text-white/50 aria-selected:bg-level-4/50 aria-selected:text-white/50 focus:bg-level-4/50 focus:text-white/50",
        day_disabled: "opacity-50",
        day_range_middle:
          "text-white/50 aria-selected:bg-level-4/50 hover:!bg-level-5 hover:!text-white/50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: () => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
