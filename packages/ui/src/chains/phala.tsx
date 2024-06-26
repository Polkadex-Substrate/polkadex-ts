import { SVGProps } from "react";

export const Phala = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    transform="scale(1.2)"
    {...props}
  >
    <circle cx={250} cy={250} r={250} />
    <path
      d="M180 259.85h171.5v57.17H180zM351.51 174.1h57.17v85.76h-57.17zM180 317.03h-57.18v85.75h57.17v-57.16h.01v-28.59z"
      fill="#d1ff52"
    />
    <path
      d="M351.51 116.93H122.82v142.93H180V174.1h171.51v-57.17z"
      fill="#d1ff52"
    />
    <path d="M180 259.85h171.5v57.17H180z" fill="#d1ff52" />
  </svg>
);
