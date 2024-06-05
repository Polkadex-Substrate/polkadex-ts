import { SVGProps } from "react";

export const Unique = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={24} cy={24} r={24} fill="#40BCFF" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M28.47 47.302c10.984-2.142 19.275-11.818 19.275-23.43C47.745 10.688 37.057 0 23.872 0 10.688 0 0 10.688 0 23.872 0 35.61 8.47 45.37 19.633 47.37v-7.301c-3.633-1.03-6.54-3.02-8.722-5.97-2.168-2.95-3.251-6.37-3.251-10.256 0-5.135 1.892-9.341 5.677-12.62C16.481 8.508 20.06 7.15 24.074 7.15c5.174 0 9.348 1.912 12.523 5.736 2.564 3.09 3.846 6.657 3.846 10.7 0 3.964-1.137 7.515-3.411 10.653-2.045 2.84-4.9 4.784-8.562 5.83v7.234Zm-.298-20.884h-8.219V30c-1.831-1.545-2.747-3.582-2.747-6.11 0-1.983.68-3.7 2.038-5.152 1.358-1.451 2.968-2.177 4.83-2.177 1.847 0 3.45.726 4.808 2.177 1.358 1.452 2.037 3.169 2.037 5.151 0 2.466-.916 4.503-2.747 6.111v-3.582Z"
      clipRule="evenodd"
    />
  </svg>
);
