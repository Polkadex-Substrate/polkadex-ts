import { ComponentProps } from "react";

export function Folder(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...props}>
      <path
        d="M17.1668 8.1835V13.0835C17.1668 16.3502 16.3502 17.1668 13.0835 17.1668H4.91683C1.65016 17.1668 0.833496 16.3502 0.833496 13.0835V4.91683C0.833496 1.65016 1.65016 0.833496 4.91683 0.833496H6.14183C7.36683 0.833496 7.63633 1.19283 8.10183 1.8135L9.32683 3.44683C9.63716 3.85516 9.81683 4.10016 10.6335 4.10016H13.0835C16.3502 4.10016 17.1668 4.91683 17.1668 8.1835Z"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        d="M5.7334 0.833496H13.0834C14.7167 0.833496 15.5334 1.65016 15.5334 3.2835V4.4105"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
