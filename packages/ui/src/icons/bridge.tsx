import { ComponentProps } from "react";

export function Bridge(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 16"
      {...props}
    >
      <path
        d="M2.91563 10.8083C3.07396 10.8083 3.23229 10.75 3.35729 10.625C3.59896 10.3833 3.59896 9.98328 3.35729 9.74162L1.66563 8.04995L3.35729 6.35828C3.59896 6.11662 3.59896 5.71662 3.35729 5.47495C3.11563 5.23328 2.71563 5.23328 2.47396 5.47495L0.340626 7.60828C0.0989597 7.84995 0.0989597 8.24995 0.340626 8.49162L2.47396 10.625C2.59896 10.75 2.75729 10.8083 2.91563 10.8083Z"
        fill="currentColor"
      />
      <path
        d="M0.840612 8.67505H9.31561C9.65728 8.67505 9.94061 8.39172 9.94061 8.05005C9.94061 7.70838 9.65728 7.42505 9.31561 7.42505H0.840612C0.498945 7.42505 0.215612 7.70838 0.215612 8.05005C0.215612 8.39172 0.498945 8.67505 0.840612 8.67505Z"
        fill="currentColor"
      />
      <path
        d="M7.64895 15.2916C11.9406 15.2916 14.9406 12.2916 14.9406 7.99998C14.9406 3.70831 11.9406 0.708313 7.64895 0.708313C7.30728 0.708313 7.02395 0.991646 7.02395 1.33331C7.02395 1.67498 7.30728 1.95831 7.64895 1.95831C11.2073 1.95831 13.6906 4.44165 13.6906 7.99998C13.6906 11.5583 11.2073 14.0416 7.64895 14.0416C7.30728 14.0416 7.02395 14.325 7.02395 14.6666C7.02395 15.0083 7.30728 15.2916 7.64895 15.2916Z"
        fill="currentColor"
      />
    </svg>
  );
}