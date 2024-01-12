import * as React from "react";
import { SVGProps } from "react";
const InvestorInvestmentIcon = (props: SVGProps<SVGSVGElement>) => {
     const {
        fill = "#A3A3A3",
        strokeWidth = undefined,
        stroke = "#A3A3A3",
      } = props;
  return (
    <svg
      width="30"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 14.8333V9.83333C6.5 8.91286 5.75381 8.16667 4.83333 8.16667H3.16667C2.24619 8.16667 1.5 8.91286 1.5 9.83333V14.8333C1.5 15.7538 2.24619 16.5 3.16667 16.5H4.83333C5.75381 16.5 6.5 15.7538 6.5 14.8333ZM6.5 14.8333V6.5C6.5 5.57953 7.24619 4.83333 8.16667 4.83333H9.83333C10.7538 4.83333 11.5 5.57953 11.5 6.5V14.8333M6.5 14.8333C6.5 15.7538 7.24619 16.5 8.16667 16.5H9.83333C10.7538 16.5 11.5 15.7538 11.5 14.8333M11.5 14.8333V3.16667C11.5 2.24619 12.2462 1.5 13.1667 1.5H14.8333C15.7538 1.5 16.5 2.24619 16.5 3.16667V14.8333C16.5 15.7538 15.7538 16.5 14.8333 16.5H13.1667C12.2462 16.5 11.5 15.7538 11.5 14.8333Z"
        stroke={stroke}
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default InvestorInvestmentIcon;
