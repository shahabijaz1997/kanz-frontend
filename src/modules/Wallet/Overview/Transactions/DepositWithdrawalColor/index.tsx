import { DealCheckType } from "../../../../../enums/types.enum";
import {
  comaFormattedNumber,
  numberFormatter,
} from "../../../../../utils/object.utils";

const DepositWithdrawalColor: any = ({ amount, type, status }: any) => {
  const spanColor = () => {
    if (status === "invested" && type === "debit") {
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
        <span className="text-blue-500">
          {" "}
          {comaFormattedNumber(amount, DealCheckType.PROPERTY)}
        </span>
      );
    } else if (status === "rejected" && type === "credit") {
      return (
        <span className="text-gray-700">
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
    }
  };

  return spanColor();
};

export default DepositWithdrawalColor;
