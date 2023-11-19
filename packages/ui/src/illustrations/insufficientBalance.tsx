import { ComponentProps } from "react";

export function InsufficientBalance(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 119 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        opacity="0.2"
        cx="59.5001"
        cy="58.044"
        rx="58.7418"
        ry="57.044"
        stroke="#FF5757"
        strokeWidth="0.99742"
      />
      <ellipse
        cx="59.5001"
        cy="58.0441"
        rx="48.5001"
        ry="47.0983"
        stroke="#FF5757"
        strokeWidth="0.823518"
      />
      <path
        d="M59.9409 96.9583C81.3748 96.9583 98.7504 79.5817 98.7504 58.1467C98.7504 36.7117 81.3748 19.3352 59.9409 19.3352C38.507 19.3352 21.1313 36.7117 21.1313 58.1467C21.1313 79.5817 38.507 96.9583 59.9409 96.9583Z"
        fill="#FF6359"
      />
      <path
        d="M52.4791 45.759L59.2354 55.136H59.4972L66.2862 45.759H74.2858L64.0613 59.5155L74.5148 73.272H66.368L59.4972 63.8816H59.2354L52.3646 73.272H44.2505L54.7367 59.5155L44.4468 45.759H52.4791Z"
        fill="white"
      />
    </svg>
  );
}
