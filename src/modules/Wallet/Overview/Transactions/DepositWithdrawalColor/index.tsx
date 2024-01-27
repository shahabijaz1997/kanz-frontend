import { DealCheckType } from "../../../../../enums/types.enum";
import {
  comaFormattedNumber,
} from "../../../../../utils/object.utils";

const DepositWithdrawalColor: any = ({ amount, type, status }: any) => {
  const spanColor = () => {
    if (status === "invested") {
      return (
        <span className="text-red-700">
          - {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "confirmed" && type === "credit") {
      return (
        <span className="text-green-700">
          + {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "pending" && type === "credit") {
      return (
        <span className="text-[#155E75]">
          {" "}
          {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "rejected" && type === "credit") {
      return (
        <span className="text-neutral-400">
          {" "}
          {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "refunded" && type === "credit") {
      return (
        <span className="text-green-700">
          + {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "deducted" && type === "fee") {
      return (
        <span className="text-red-700">
          - {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else {
      return (
        <span className="text-black">
          {" "}
          {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    }
  };

  return spanColor();
};

export default DepositWithdrawalColor;
