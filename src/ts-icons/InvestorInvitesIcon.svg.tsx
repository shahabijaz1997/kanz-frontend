import * as React from "react";
import { SVGProps } from "react";
const InvestorInvitesIcon = (props: SVGProps<SVGSVGElement>) => {
    const {
        fill = "#A3A3A3",
        strokeWidth = undefined,
        stroke = undefined,
      } = props;
    return(
        <svg
        width="30"
        height="18"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={strokeWidth}
        stroke={stroke}
      >
        <path
          d="M10.7188 2.0625H3.28125C3.15365 2.08073 3.08073 2.15365 3.0625 2.28125V6.90234L1.88672 5.94531C1.85026 5.90885 1.80469 5.8724 1.75 5.83594V2.28125C1.76823 1.84375 1.91406 1.47917 2.1875 1.1875C2.47917 0.914062 2.84375 0.768229 3.28125 0.75H10.7188C11.1562 0.768229 11.5208 0.914062 11.8125 1.1875C12.0859 1.47917 12.2318 1.84375 12.25 2.28125V5.83594C12.1953 5.8724 12.1497 5.90885 12.1133 5.94531L10.9375 6.90234V2.28125C10.9193 2.15365 10.8464 2.08073 10.7188 2.0625ZM4.375 4.03125C4.41146 3.63021 4.63021 3.41146 5.03125 3.375H8.96875C9.36979 3.41146 9.58854 3.63021 9.625 4.03125C9.58854 4.43229 9.36979 4.65104 8.96875 4.6875H5.03125C4.63021 4.65104 4.41146 4.43229 4.375 4.03125ZM4.375 6.21875C4.41146 5.81771 4.63021 5.59896 5.03125 5.5625H8.96875C9.36979 5.59896 9.58854 5.81771 9.625 6.21875C9.58854 6.61979 9.36979 6.83854 8.96875 6.875H5.03125C4.63021 6.83854 4.41146 6.61979 4.375 6.21875ZM1.3125 8.29688V13.2188C1.33073 13.3464 1.40365 13.4193 1.53125 13.4375H12.4688C12.5964 13.4193 12.6693 13.3464 12.6875 13.2188V8.29688L8.80469 11.4961C8.25781 11.9154 7.65625 12.125 7 12.125C6.34375 12.125 5.74219 11.9154 5.19531 11.4961L1.3125 8.29688ZM0 7.25781C0 7.02083 0.0820312 6.82943 0.246094 6.68359C0.391927 6.51953 0.583333 6.4375 0.820312 6.4375C1.02083 6.4375 1.19401 6.5013 1.33984 6.62891L6.04297 10.4844C6.33464 10.7214 6.65365 10.8398 7 10.8398C7.36458 10.8398 7.69271 10.7214 7.98438 10.4844L12.6602 6.62891C12.806 6.5013 12.9792 6.4375 13.1797 6.4375C13.4167 6.4375 13.6081 6.51953 13.7539 6.68359C13.918 6.82943 14 7.02083 14 7.25781V13.2188C13.9818 13.6562 13.8359 14.0208 13.5625 14.3125C13.2708 14.5859 12.9062 14.7318 12.4688 14.75H1.53125C1.09375 14.7318 0.729167 14.5859 0.4375 14.3125C0.164062 14.0208 0.0182292 13.6562 0 13.2188V7.25781Z"
          fill={fill}
        />
      </svg>
    )
 
  }
export default InvestorInvitesIcon;
