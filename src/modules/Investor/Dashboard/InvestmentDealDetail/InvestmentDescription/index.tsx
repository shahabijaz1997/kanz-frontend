import { DealCheckType } from "../../../../../enums/types.enum";
import ProfitInvestorIcon from "../../../../../ts-icons/ProfitInvestorIcon.svg";
import { comaFormattedNumber } from "../../../../../utils/object.utils";
import MultipleDecider from "../../Performance/Investments/MultipleDecider";
import InvestmentDescriptionGraph from "./InvestmentDescriptionGraph";

const InvestmentDescription = ({data}:any) => {
  return (
    <main className="border-[1px] border-[#E5E5E5] shadow-xl rounded-md pb-5">
      <section className="flex justify-evenly pb-[1rem]">
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full px-3 py-10 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Net Value
            </div>
            <div className="font-bold text-4xl mb-2">{comaFormattedNumber(data?.stats?.net_value, DealCheckType.PROPERTY)}</div>
     {/*        <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div> */}
          </aside>
        </div>
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full px-3 py-10 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Investment Amount
            </div>
            <div className="font-bold text-4xl mb-2">{comaFormattedNumber(data?.stats?.invested_amount, DealCheckType.PROPERTY)}</div>
           {/*  <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div> */}
          </aside>
        </div>
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full px-3 py-10 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Multiple
            </div>
            <div className="font-bold text-4xl mb-2"><MultipleDecider multiple={data?.stats?.multiple} large /></div>
            {/* <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div> */}
          </aside>
        </div>
      </section>
      <aside><InvestmentDescriptionGraph data={data?.charts}/></aside>
    </main>
  );
};

export default InvestmentDescription;
