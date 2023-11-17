import { ComponentProps } from "react";

export function ENKRYPT(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" {...props}>
      <rect
        width="41"
        height="41"
        rx="20.5"
        fill="url(#paint0_radial_209_4095)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 14.9637C11 13.0506 12.637 11.5 14.6562 11.5H30V14.1577C30 15.5327 28.8235 16.6472 27.3721 16.6472H20.1581C18.1387 16.6472 16.5019 18.198 16.5019 20.1111V20.9924C16.5019 22.9055 18.1387 24.4561 20.1581 24.4561H27.3721C28.8235 24.4561 30 25.5708 30 26.9458V29.5H14.6562C12.637 29.5 11 27.949 11 26.0361V14.9637ZM20.316 18.0958H27.7148C28.977 18.0958 30 19.0651 30 20.2606V20.8429C30 22.0385 28.977 23.0078 27.7148 23.0078H20.316C19.0538 23.0078 18.0307 22.0385 18.0307 20.8429V20.2606C18.0307 19.0651 19.0538 18.0958 20.316 18.0958Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_209_4095"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1.13809 -1.13816) rotate(55.3777) scale(58.0898 232.12)"
        >
          <stop offset="0.051483" stop-color="#C549FF" />
          <stop offset="0.815643" stop-color="#704BFF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
