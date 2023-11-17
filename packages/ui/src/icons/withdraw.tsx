import { ComponentProps } from "react";

export function Withdraw(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 10.25C7 10.5261 7.22386 10.75 7.5 10.75C7.77614 10.75 8 10.5261 8 10.25L8 2.45711L10.8964 5.35355C11.0917 5.54882 11.4083 5.54882 11.6036 5.35355C11.7988 5.15829 11.7988 4.84171 11.6036 4.64645L7.85355 0.896447C7.65829 0.701185 7.34171 0.701185 7.14645 0.896447L3.39645 4.64645C3.20118 4.84171 3.20118 5.15829 3.39645 5.35355C3.59171 5.54882 3.90829 5.54882 4.10355 5.35355L7 2.45711L7 10.25ZM1.25 10.25C1.25 9.97386 1.02614 9.75 0.75 9.75C0.473858 9.75 0.25 9.97386 0.25 10.25V13.25C0.25 13.7804 0.460714 14.2891 0.835786 14.6642C1.21086 15.0393 1.71957 15.25 2.25 15.25H12.75C13.2804 15.25 13.7891 15.0393 14.1642 14.6642C14.5393 14.2891 14.75 13.7804 14.75 13.25V10.25C14.75 9.97386 14.5261 9.75 14.25 9.75C13.9739 9.75 13.75 9.97386 13.75 10.25V13.25C13.75 13.5152 13.6446 13.7696 13.4571 13.9571C13.2696 14.1446 13.0152 14.25 12.75 14.25H2.25C1.98478 14.25 1.73043 14.1446 1.54289 13.9571C1.35536 13.7696 1.25 13.5152 1.25 13.25V10.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
