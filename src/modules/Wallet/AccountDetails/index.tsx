import { toast } from "react-toastify";
import Button from "../../../shared/components/Button";
import { toastUtil } from "../../../utils/toast.utils";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import React from "react";
import {  eng_arb_commaFormattedNumber } from "../../../utils/object.utils";
import { DealCheckType } from "../../../enums/types.enum";

const AccountDetails = ({ setStep ,amount, event, language }: any): any => {
  const accDetails = {
    [language?.v3?.wallet?.amount]: eng_arb_commaFormattedNumber(amount, DealCheckType.PROPERTY, event),
    [language?.v3?.wallet?.currency]:language?.v3?.wallet?.aed,
    [language?.v3?.wallet?.account_name]: process.env.REACT_APP_ACC_NAME,
    [language?.v3?.wallet?.account_no]: process.env.REACT_APP_ACC_NUM,
    [language?.v3?.wallet?.iban_no]: process.env.REACT_APP_IBAN,
    [language?.v3?.wallet?.bank_name]: process.env.REACT_APP_BANK_NAME,
    [language?.v3?.wallet?.branch_code]: process.env.REACT_APP_BRANCH_CODE,
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
              {language?.v3?.wallet?.wallet_deposit_initiated}
            </span>
            <span className="text-[#737373] text-xs mt-3">
              {language?.v3?.wallet?.disclaimer_description}
            </span>
            <span className="text-[#737373] border-b-[1px]  border-[#E5E5E5] text-xs mt-3 w-full pb-2 text-center whitespace-break-spaces">
              {language?.v3?.wallet?.send_proof_of_transfer_email}
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
                    language?.v3?.wallet?.account_name + " " +
                    accDetails[language?.v3?.wallet?.account_name] +      //CHANGE COPY DETIALS TO THE CORRECT KEYS
                      "\n" +
                      language?.v3?.wallet?.account_no  + " " +
                      accDetails[language?.v3?.wallet?.account_no] +
                      "\n" +
                      language?.v3?.wallet?.iban_no + " " +
                      accDetails[language?.v3?.wallet?.iban_no] +
                      "\n" +
                      language?.v3?.wallet?.bank_name + " " +
                      accDetails[language?.v3?.wallet?.bank_name] +
                      "\n" +
                      language?.v3?.wallet?.branch_code + " " +
                      accDetails[language?.v3?.wallet?.branch_code]
                  ); 
                  toast.success(language?.v3?.wallet?.copied, toastUtil);
                }}
                className="w-full"
                type="outlined"
              >
                {language?.v3?.wallet?.copy_details}
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
                {language?.v3?.wallet?.upload_receipt}
              </Button>
            </span>
          </span>
        </div>
      </section>
    </aside>
  );
};

export default AccountDetails;
