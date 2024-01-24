import { useState } from "react";
import Button from "../../../shared/components/Button";
import WalletSpanIcon from "../../../ts-icons/WalletSpanIcon.svg";

const Overview = ({ setStep, setAmount ,setMethod }: any): any => {
  const [selectedBorder, setSelectedBorder] = useState(false);
  return (
    <section className="flex justify-between items-start gap-56">
      <section className="flex flex-col items-start justify-start w-1/2">
        <div className="flex flex-col items-start justify-center w-full border-[1px] border-[#E5E5E5] rounded-lg shadow-md p-6 mt-5">
          <h1 className="text-[#667085] font-medium">Current Balance</h1>
          <p className="text-black font-semibold text-4xl mt-3">AED $74.k</p>
        </div>
        <span className="flex flex-col items-start justify-start w-full mt-10">
          <label className="text-xs font-medium" htmlFor="amount">
            Deposit Amount
          </label>
          <span className=" border-[1px] border-[#E5E5E5] rounded-md overflow-hidden mt-2 w-full">
            <span className="flex items-center relative">
              <WalletSpanIcon />
              <span className="text-[#737373] absolute left-11">AED</span>
              <input
              onChange={(e)=>{
                  setAmount(e.target.value)
              }}
                placeholder="Enter your amount"
                type="text"
                className="rounded-sm h-8 px-12 font-normal w-full text-[#115E75] outline-none"
              />
            </span>
          </span>
        </span>
        <span className="flex  flex-col items-start justify-start w-full mt-10 ">
          <label className="font-medium text-xs" htmlFor="payment">
            How would you like to make payment?
          </label>
          <span
            className={` ${
              selectedBorder ? "border-[#155E75]" : "border-[#E5E5E5]"
            } border-[1px] rounded-md flex items-start overflow-hidden mt-3 w-full ${
              selectedBorder ? "bg-[#F2F5F6]" : "bg-white"
            }`}
          >
            <span className="flex items-center justify-start p-3 gap-2">
              <input
                onClick={() => {
                  setSelectedBorder(true);
                  setMethod('offline')
                }}
                type="radio"
                className="border-[1px] border-[#E5E5E5]  font-normal w-full "
              />
              <span
                className={`text-xs  ${
                  selectedBorder ? "text-[#155E75]" : "text-black"
                } font-medium whitespace-nowrap`}
              >
                Offline bank transfer (several days)
              </span>
            </span>
          </span>
          <span
            className={` 'border-[#E5E5E5]' border-[1px] rounded-md flex items-start overflow-hidden mt-3 w-full bg-white}`}
          >
            <span className="flex items-center justify-start p-3 gap-2">
              <input
                disabled
                onClick={() => {
                  setSelectedBorder(true);
                  setMethod('offline')
                }}
                type="radio"
                className="border-[1px] border-[#E5E5E5]  font-normal w-full "
              />
              <span className={`text-xs font-medium whitespace-nowrap`}>
                Using your debit card (subject to 2.55% payment gateway fees)
              </span>
            </span>
          </span>
          <span className="text-xs mt-2 font-medium">
            To learn more, please visit help center.
          </span>
        </span>

        <span className="w-full mt-10">
          <Button onClick={() => setStep(2)} className="!w-full" type="primary">
            Fund Wallet
          </Button>
        </span>
      </section>
      <section className="w-1/2 border-[1px] p-2   rounded-md bg-white border-[#E5E5E5]">
        <div className="p-2 gap-10 justify-start flex flex-col ">
          <h1 className="text-black font-medium">Transaction Details</h1>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Current Balance <span className="font-normal">AED 74K</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm py-1.5 justify-between">
            Deposit Amount <span className="font-normal">AED 74K</span>
          </span>
          <span className=" w-full flex font-medium text-sm py-1 justify-between">
            New Balance <span className="font-normal">AED 74K</span>
          </span>
        </div>
      </section>
    </section>
  );
};

export default Overview;
