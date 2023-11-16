import { ComponentProps } from "react";

export function Check(props: ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" {...props}>
      <path
        d="M5.17525 4.51494L9.54762 0.222758C9.61912 0.152198 9.7043 0.0961713 9.79821 0.0579314C9.89213 0.0196915 9.99291 0 10.0947 0C10.1965 0 10.2973 0.0196915 10.3912 0.0579314C10.4851 0.0961713 10.5703 0.152198 10.6418 0.222758L11.3698 0.935869C11.5148 1.0787 11.5961 1.27143 11.5961 1.47226C11.5961 1.67309 11.5148 1.86583 11.3698 2.00865L5.72179 7.55554C5.57883 7.69634 5.40861 7.80813 5.22098 7.88442C5.03334 7.96072 4.83203 8 4.6287 8C4.42537 8 4.22405 7.96072 4.03642 7.88442C3.84879 7.80813 3.67856 7.69634 3.5356 7.55554L0.620331 4.69374C0.475351 4.55091 0.394043 4.35817 0.394043 4.15734C0.394043 3.95651 0.475351 3.76378 0.620331 3.62095L1.34942 2.90576C1.4209 2.83536 1.50601 2.77946 1.59982 2.74132C1.69364 2.70317 1.7943 2.68353 1.89596 2.68353C1.99763 2.68353 2.09829 2.70317 2.1921 2.74132C2.28592 2.77946 2.37103 2.83536 2.44251 2.90576L4.08215 4.51494C4.15363 4.58534 4.23874 4.64123 4.33256 4.67938C4.42638 4.71753 4.52703 4.73717 4.6287 4.73717C4.73037 4.73717 4.83102 4.71753 4.92484 4.67938C5.01865 4.64123 5.10377 4.58534 5.17525 4.51494Z"
        fill="currentColor"
      />
    </svg>
  );
}
