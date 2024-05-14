import { ComponentProps } from "react";

export function BNC(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="#000"
        d="M0 50C0 22.386 22.386 0 50 0s50 22.386 50 50-22.386 50-50 50S0 77.614 0 50Z"
      />
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M50 72.368H19.737l45.395-45.394h15.131L50 72.368Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1={50}
          x2={50}
          y1={26.974}
          y2={72.368}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7AEDCF" />
          <stop offset={0.201} stopColor="#68CEFA" />
          <stop offset={0.403} stopColor="#689CF8" />
          <stop offset={0.602} stopColor="#AC57C0" />
          <stop offset={0.802} stopColor="#E65659" />
          <stop offset={1} stopColor="#F2C241" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M19.737 26.974h60.526v45.395H19.737z" />
        </clipPath>
      </defs>
    </svg>
  );
}
