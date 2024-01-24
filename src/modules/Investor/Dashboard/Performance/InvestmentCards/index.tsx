import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfitInvestorIcon from "../../../../../ts-icons/ProfitInvestorIcon.svg";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { useEffect } from "react";
import { numberFormatter } from "../../../../../utils/object.utils";
import { DealCheckType } from "../../../../../enums/types.enum";

const InvestmentCards = ({ data, loading }: any): any => {
  const language: any = useSelector((state: RootState) => state.language.value);
  return (
    <main className="flex justify-evenly">
      <div className="w-[30%]">
        <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
          <div className="mb-2 font-medium text-[#737373] ">
            {language?.v3?.investor?.investment_value}
          </div>
          <div className="font-bold text-4xl mb-2">
            {numberFormatter(data?.all?.invested_amount, DealCheckType.STARTUP)}
          </div>
          <div className="mb-2 text-[#737373] ">
            {data?.all?.no_investments}
            {language?.v3?.investor?.total_investments}
            {" " +
              numberFormatter(
                data?.all?.invested_amount,
                DealCheckType.STARTUP
              )}
          </div>
          <div className="w-full flex items-center">
            <div>
              <ProfitInvestorIcon />
            </div>
            <span className="ml-1 text-[#155E75]">
              {language?.v3?.investor?.investment_multiple}{" "}
            </span>
            <span className="ml-1 text-[#737373]">
              {language?.v3?.investor?.irr_percentage}
            </span>
          </div>
        </aside>
      </div>
      <div className="w-[30%]">
        <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
          <div className="mb-2 font-medium text-[#737373] ">
            {language?.v3?.investor?.investment_startup}
          </div>
          <div className="font-bold text-4xl mb-2">
            {numberFormatter(
              data?.startup?.invested_amount,
              DealCheckType.STARTUP
            )}
          </div>
          <div className="mb-2 text-[#737373] ">
            {data?.startup?.no_investments}
            {language?.v3?.investor?.total_investments}
            {" " +
              numberFormatter(
                data?.startup?.invested_amount,
                DealCheckType.STARTUP
              )}
          </div>
          <div className="w-full flex items-center">
            <div>
              <ProfitInvestorIcon />
            </div>
            <span className="ml-1 text-[#155E75]">
              {language?.v3?.investor?.investment_multiple}
            </span>
            <span className="ml-1 text-[#737373]">
              {language?.v3?.investor?.irr_percentage}
            </span>
          </div>
        </aside>
      </div>
      <div className="w-[30%]">
        <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
          <div className="mb-2 font-medium text-[#737373] ">
            {language?.v3?.investor?.investment_property}
          </div>
          <div className="font-bold text-4xl mb-2">
            {numberFormatter(
              data?.property?.invested_amount,
              DealCheckType.STARTUP
            )}
          </div>
          <div className="mb-2 text-[#737373] ">
            {data?.property?.no_investments}
            {language?.v3?.investor?.total_investments}
            {" " +
              numberFormatter(
                data?.property?.invested_amount,
                DealCheckType.STARTUP
              )}
          </div>
          <div className="w-full flex items-center">
            <div>
              <ProfitInvestorIcon />
            </div>
            <span className="ml-1 text-[#155E75]">
              {language?.v3?.investor?.investment_multiple}
            </span>
            <span className="ml-1 text-[#737373]">
              {language?.v3?.investor?.irr_percentage}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
};
export default InvestmentCards;
