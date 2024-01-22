import { ComponentProps } from "react";

export function PHA(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" {...props}>
      <path
        d="M74.0196 125.034H176.054V159.049H74.0196V125.034ZM176.06 74.0148H210.074V125.04H176.06V74.0148ZM74.0196 159.055H40V210.074H74.0136V176.065H74.0196V159.055Z"
        fill="#D1FF52"
      />
      <path
        d="M176.06 40H40V125.04H74.0196V74.0148L176.06 74.0148V40Z"
        fill="#D1FF52"
      />
      <path
        d="M74.0196 125.034H176.054V159.049H74.0196V125.034Z"
        fill="#D1FF52"
      />
    </svg>
  );
}
