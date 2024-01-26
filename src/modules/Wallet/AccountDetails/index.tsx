import { toast } from "react-toastify";
import Button from "../../../shared/components/Button";
import { toastUtil } from "../../../utils/toast.utils";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import React from "react";
import { comaFormattedNumber } from "../../../utils/object.utils";
import { DealCheckType } from "../../../enums/types.enum";

const AccountDetails = ({ setStep ,amount }: any): any => {
  const accDetails = {
    "Amount": comaFormattedNumber(amount, DealCheckType.PROPERTY),
    "Currency":"AED",
    "Account Name": process.env.REACT_APP_ACC_NAME,
    "Account No": process.env.REACT_APP_ACC_NUM,
    "IBAN No": process.env.REACT_APP_IBAN,
    "Bank Name": process.env.REACT_APP_BANK_NAME,
    "Branch Code": process.env.REACT_APP_BRANCH_CODE,
  };

  return (
    <aside className="p-2 flex items-center justify-center w-full">
      <section className="w-[60%] border-[0.5px] p-1 rounded-md bg-white border-[#E5E5E5] shadow-lg">
        <div className="gap-4 px-6 py-1 justify-start flex flex-col ">
          <span
            className=" mt-1 cursor-pointer flex justify-end items-center w-full"
            onClick={() => setStep(1)}
          >
            <CrossIcon stroke="#000" className="w-6 h-6" />
          </span>
          <section className="flex justify-center items-center w-full flex-col">
            <span className="text-lg font-semibold">
              Wallet Deposit Intiated
            </span>
            <span className="text-[#737373] text-xs mt-3">
              Description related to discalaimer
            </span>
            <span className="text-[#737373] border-b-[1px]  border-[#E5E5E5] text-xs mt-3 w-full pb-2 text-center whitespace-break-spaces">
              Kindly send a proof of transfer to Kanz@gmail.com to speed up your
              investment process
            </span>
          </section>
          {React.Children.toArray(
            Object.entries(accDetails)?.map(([key, value]) => {
              return (
                <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1 justify-between">
                  {key} <span className="font-normal">{value}</span>
                </span>
              );
            })
          )}
          <span className="w-full flex font-medium text-sm pt-1.5 pb-2 gap-8 justify-evenly">
            <span className="w-full">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "Account Name: " +
                    accDetails["Account Name"] +
                      "\n" +
                      "Account No: " +
                      accDetails["Account No"] +
                      "\n" +
                      "IBAN No: " +
                      accDetails["IBAN No"] +
                      "\n" +
                      "Bank Name: " +
                      accDetails["Bank Name"] +
                      "\n" +
                      "Branch Code: " +
                      accDetails["Branch Code"]
                  ); 
                  toast.success("Copied", toastUtil);
                }}
                className="w-full"
                type="outlined"
              >
                Copy Details
              </Button>
            </span>
            <span className="w-full">
              <Button
                onClick={() => {
                  setStep(3);
                }}
                className="w-full"
                type="primary"
              >
                Upload Receipt
              </Button>
            </span>
          </span>
        </div>
      </section>
    </aside>
  );
};

export default AccountDetails;
