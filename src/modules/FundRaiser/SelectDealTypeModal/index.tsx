import { useSelector } from "react-redux";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import { RootState } from "../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../enums/routes.enum";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import CurrencySVG from "../../../assets/svg/currency.svg";

import { useState } from "react";
import InvestorHomeIcon from "../../../ts-icons/InvestorHomeIcon.svg";
import SelectPropertyHomeIcon from "../../../ts-icons/SelectPropertyHomeIcon.svg";
import SelectDealArrowIcon from "../../../ts-icons/SelectDealArrowIcon.svg";

const SelectDealTypeModal = ({ handleCloseModal }: any) => {
  function dispatch(arg0: {
    payload: String;
    type: "datHolder/saveDataHolder";
  }) {
    throw new Error("Function not implemented.");
  }
  const language: any = useSelector((state: RootState) => state.language.value);
  const navigate = useNavigate();
  const [startupborderColor, setStartupBorderColor] =
    useState<string>("##E0E0E0");
  const [propertyborderColor, setPropertyBorderColor] =
    useState<string>("##E0E0E0");
  const handleStartupClick = () => {
    setStartupBorderColor("#155E75");
    setPropertyBorderColor("#E0E0E0");
  };
  const handlePropertyClick = () => {
    setStartupBorderColor("#E0E0E0");
    setPropertyBorderColor("#155E75");
  };
  return (
    <div
      className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
    >
      <aside className="bg-white w-[400px] rounded-md h-full">
        <section className="justify-end flex p-4 bg-[#F2F2F2]">
          <button
            className=" border-black border-[1px] p-1"
            onClick={handleCloseModal}
          >
            {" "}
            <CrossIcon stroke="#171717" className="w-5 h-5" />
          </button>
        </section>
        <section className="px-10">
          <div className="mb-6 pt-5 text-center">
            <label
              htmlFor=""
              className="text-neutral-900 text-center font-bold text-xl"
            >
              Create Deal
            </label>
            <div className="mt-6">
              <div
                className={`border-[1px] rounded-md border-[${startupborderColor}]`}
                onClick={handleStartupClick}
              >
                <div className="p-4 gap-1 items-center flex justify-center">
                  <span className=" rounded-md h-8 w-8 align-start inline-grid place-items-center">
                    <img src={CurrencySVG} alt="" />
                  </span>
                  <span className="font-bold">For Startup</span>
                  <span className="ml-12 p-2 bg-[#F5F5F5] rounded-full"><SelectDealArrowIcon/></span>
                </div>
              </div>
              <div
                className={`border-[1px] mt-3 rounded-md border-[${propertyborderColor}]`}
                onClick={handlePropertyClick}
              >
                <div className="p-4 gap-1 items-center flex justify-center">
                  <span className=" rounded-md h-8 w-8 align-start inline-grid place-items-center">
                    <SelectPropertyHomeIcon/>
                  </span>
                  <span className="font-bold">{"For Property"}</span>
                  <span className="ml-10 p-2 bg-[#F5F5F5] rounded-full"><SelectDealArrowIcon/></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};
export default SelectDealTypeModal;
