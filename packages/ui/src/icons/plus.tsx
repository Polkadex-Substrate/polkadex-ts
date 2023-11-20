import { ComponentProps } from "react";

export function Plus(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" {...props}>
      <path
        d="M6.09668 16.549V11.7941C6.09668 11.2869 6.16699 10.8669 6.30762 10.5341C6.46387 10.2013 6.71387 9.97936 7.05762 9.86841L6.09668 9.10764V0.54895H9.02637V16.549H6.09668ZM0.0498047 9.86841V7.11061H15.0498V9.86841H0.0498047Z"
        fill="#A8ADB7"
      />
    </svg>
  );
}
