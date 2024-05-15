import { ComponentProps } from "react";

export function VDOT(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
      xmlSpace="preserve"
      id="Layer_1"
      x={0}
      y={0}
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      <rect width={64} height={64} fill="#fff" rx={32} />
      <path
        fill="#E6007A"
        fillRule="evenodd"
        d="M39.45 15.425c0 2.445-3.406 4.426-7.609 4.426-4.202 0-7.609-1.981-7.609-4.425 0-2.445 3.407-4.426 7.61-4.426 4.202 0 7.608 1.981 7.608 4.425Zm0 33.346c0 2.444-3.406 4.425-7.609 4.425-4.202 0-7.609-1.981-7.609-4.425s3.407-4.426 7.61-4.426c4.202 0 7.608 1.982 7.608 4.426ZM21.237 25.977c2.101-3.64 2.088-7.581-.03-8.804-2.118-1.223-5.539.736-7.64 4.376-2.101 3.639-2.088 7.58.03 8.803 2.119 1.223 5.539-.736 7.64-4.375Zm28.847 7.868c2.117 1.222 2.13 5.163.028 8.802-2.101 3.64-5.52 5.6-7.637 4.377-2.117-1.222-2.129-5.163-.028-8.802 2.101-3.64 5.52-5.599 7.637-4.377ZM21.208 47.023c2.118-1.223 2.132-5.164.03-8.804-2.1-3.639-5.521-5.598-7.64-4.375-2.117 1.223-2.13 5.164-.03 8.804 2.102 3.64 5.522 5.598 7.64 4.375Zm28.906-25.472c2.101 3.64 2.089 7.58-.028 8.802-2.117 1.222-5.536-.737-7.637-4.377-2.101-3.639-2.089-7.58.028-8.802 2.117-1.222 5.536.738 7.637 4.377Z"
        clipRule="evenodd"
      />
      <path
        fill="url(#a)"
        stroke="#fff"
        strokeWidth={2}
        d="M52 63c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z"
      />
      <path
        fill="#fff"
        d="m51.584 56.376-4.066-6.099a.5.5 0 0 1 .416-.777h1.808a.5.5 0 0 1 .408.21l1.443 2.03a.5.5 0 0 0 .815 0l1.443-2.03a.5.5 0 0 1 .407-.21h1.808a.5.5 0 0 1 .416.777l-4.066 6.099a.5.5 0 0 1-.832 0Z"
      />
      <path
        fill="url(#b)"
        fillRule="evenodd"
        d="M41.756 58.253A27.942 27.942 0 0 1 32 60C16.536 60 4 47.464 4 32S16.536 4 32 4s28 12.536 28 28c0 3.431-.617 6.718-1.747 9.756a12.064 12.064 0 0 1 3.18 2.825A31.897 31.897 0 0 0 64 32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32 4.466 0 8.719-.915 12.58-2.568a12.064 12.064 0 0 1-2.824-3.179Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="a"
          x1={52}
          x2={52}
          y1={42}
          y2={62}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7AEDCF" />
          <stop offset={0.201} stopColor="#68CEFA" />
          <stop offset={0.403} stopColor="#689CF8" />
          <stop offset={0.602} stopColor="#AC57C0" />
          <stop offset={0.802} stopColor="#E65659" />
          <stop offset={1} stopColor="#F2C241" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={32}
          x2={32}
          y1={0}
          y2={64}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7AEDCF" />
          <stop offset={0.201} stopColor="#68CEFA" />
          <stop offset={0.403} stopColor="#689CF8" />
          <stop offset={0.602} stopColor="#AC57C0" />
          <stop offset={0.802} stopColor="#E65659" />
          <stop offset={1} stopColor="#F2C241" />
        </linearGradient>
      </defs>
    </svg>
  );
}
