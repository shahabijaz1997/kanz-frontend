import ProfitInvestorIcon from "../../../../../ts-icons/ProfitInvestorIcon.svg";
import InvestmentDescriptionGraph from "./InvestmentDescriptionGraph";

const InvestmentDescription = () => {
  return (
    <main className="border-[1px] border-[#E5E5E5] shadow-xl rounded-md pb-5">
      <section className="flex justify-evenly pb-[1rem]">
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Investment Value
            </div>
            <div className="font-bold text-4xl mb-2">$73.1K</div>
            <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div>
          </aside>
        </div>
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Investment Value
            </div>
            <div className="font-bold text-4xl mb-2">$73.1K</div>
            <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div>
          </aside>
        </div>
        <div className="w-[30%]">
          <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
            <div className="mb-2 font-medium text-[#737373] ">
              Investment Value
            </div>
            <div className="font-bold text-4xl mb-2">$73.1K</div>
            <div className="mb-2 text-[#737373] ">
              42 investments - total investment 59.2K
            </div>
            <div className="w-full flex items-center">
              <div>
                <ProfitInvestorIcon />
              </div>
              <span className="ml-1 text-[#155E75]">1.09x - </span>
              <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            </div>
          </aside>
        </div>
      </section>
      <aside><InvestmentDescriptionGraph/></aside>
    </main>
  );
};

export default InvestmentDescription;
