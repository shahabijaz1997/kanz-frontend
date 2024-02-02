import { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import WalletSpanIcon from "../../../ts-icons/WalletSpanIcon.svg";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { comaFormattedNumber } from "../../../utils/object.utils";
import { DealCheckType } from "../../../enums/types.enum";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../enums/routes.enum";

const Overview = ({
  setStep,
  currentBalance,
  setAmount,
  amount,
  method,
  setMethod,
}: any): any => {

  const navigate = useNavigate()
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 8) return;
    if (['-', 'e','E', '+'].includes(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 7) {
      e.preventDefault();
    }
  };
  useEffect(()=>{
    setMethod("")
    setAmount(0)
  },[])


  let newValue :number =  Number(amount) + Number(currentBalance) 
  const [selectedBorder, setSelectedBorder] = useState(false);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [open, setOpen] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  return (
    <section className="flex justify-between items-start gap-56">
      <section className="flex flex-col items-start justify-start w-1/2">
        <div className="flex items-center justify-center w-full border-[1px] border-[#E5E5E5] rounded-lg shadow-md p-6 mt-5">
       <span className="w-full">
       <h1 className="text-[#667085] text-base">Current Balance</h1>
          <p className="text-black font-semibold text-2xl mt-3">{comaFormattedNumber(currentBalance, DealCheckType.PROPERTY)}</p>
       </span>
       <span className="w-full flex items-center justify-center">
          <Button className="!text-xs" onClick={()=>{
            navigate(RoutesEnums.TRANSACTIONS)
          }}>View All Transactions</Button>
       </span>
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
                min={0}
                required
                onChange={(e: any) => {
                  let inputValue = e.target.value.replace(/[^\d.]/g, "");
                  if (inputValue.length > 7) {
                    inputValue = inputValue.slice(0, 7);
                  }
                  if (/^\d*\.?\d*$/.test(inputValue) || !inputValue) {
                    setAmount(inputValue);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your amount"
                type="number"
                pattern="[0-9]*"
                className="rounded-sm h-8 px-12 font-normal w-full text-[#115E75] outline-none"
                maxLength={7}
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
                required
                onClick={() => {
                  setSelectedBorder(true);
                  setMethod("offline");
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
                  setMethod("offline");
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
          <Button
            disabled={!method || !amount || /^0+$/.test(amount)}
            onClick={() => setOpen(true)}
            className="!w-full"
            type="primary"
          >
            Fund Wallet
          </Button>
        </span>
      </section>
      <section className="w-1/2 mb-10">
      <section className="w-full border-[1px] p-2   rounded-md bg-white border-[#E5E5E5]">
        <div className="p-2 gap-10 justify-start flex flex-col ">
          <h1 className="text-black font-medium">Transaction Details</h1>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm justify-between">
            Current Balance <span className="font-normal">{comaFormattedNumber(currentBalance, DealCheckType.PROPERTY)}</span>
          </span>
          <span className="border-b-[1px] border-[#E5E5E5] w-full flex font-medium text-sm justify-between">
            Deposit Amount <span className="font-normal">{comaFormattedNumber(amount, DealCheckType.PROPERTY)}</span>
          </span>
          <span className=" w-full flex font-medium text-sm  justify-between">
            New Balance <span className="font-normal">{comaFormattedNumber(newValue, DealCheckType.PROPERTY)}</span>
          </span>
        </div>
        </section>
      </section>
      <Modal show={open ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[500px] rounded-md h-full">
            <header className=" h-16 py-2 px-3 inline-flex w-full justify-end items-center">
              <div
                onClick={() => setOpen(false)}
                className="bg-white h-8 w-8 p-1 cursor-pointer"
              >
                <CrossIcon stroke="#000" />
              </div>
            </header>
            <section className="flex flex-col items-center justify-center">
              <h3 className="flex items-center w-full justify-center font-bold text-lg">
                Disclaimer
              </h3>
              <p className="text-[#737373] text-sm mt-3">
                Description about disclaimer
              </p>
              <div className="border-t-[#E5E5E5] border-t-[1px] w-[50%] pt-4">
                <span className="flex items-start justify-start gap-2">
                  <input
                    className="mt-1.5"
                    type="checkbox"
                    name=""
                    id="disclaimer"
                    onChange={()=>{
                      setButtonEnable(!buttonEnable)
                    }}
                  />
                  <span>
                    <span className="font-semibold text-start">Disclaimer</span>
                    <p className="text-[#737373]  text-sm">
                      Description about disclaimer 1
                    </p>
                  </span>
                </span>
              </div>
              <footer className="w-[50%] inline-flex justify-center gap-10 py-6 px-3">
                <Button
                onClick={()=>{
                  setOpen(false)
                }}
                  type="outlined"
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                >
                  {"Cancel"}
                </Button>
                <Button
                  onClick={() => {
                    setStep(2);
                  }}
                  disabled={!buttonEnable}
                  className="w-full !py-1"
                  divStyle="flex items-center justify-center w-full"
                >
                  {"Continue"}
                </Button>
              </footer>
            </section>
          </aside>
        </div>
      </Modal>
    </section>
  );
};

export default Overview;
