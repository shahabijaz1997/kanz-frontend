import { useEffect, useState } from "react";
import DoghnutGraph from "./DoghnutGraph";
import {
  getInvestorAnalyticsFundingRoundInvestments,
  getInvestorAnalyticsInvestments,
} from "../../../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux-toolkit/store/store";
import Spinner from "../../../../../shared/components/Spinner";

const InvestedByRound = ({ routeInsights }: any): any => {
  const [investmentsByRound, setInvestmentsByRound]: any = useState({
    "Series A": 0,
    "Mezzanine & bridge": 0,
    "Pre-seed": 0,
    "Seed / Angel": 0,
    "Series B": 0,
    "Series C": 0,
    "Series D": 0,
  });
  const [loading, setLoading] = useState(false);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const {
    "Series A": seriesA,
    "Mezzanine & bridge": mezzanineBridge,
    "Pre-seed": preSeed,
    "Seed / Angel": seedAngel,
    "Series B": seriesB,
    "Series C": seriesC,
    "Series D": seriesD,
  } = investmentsByRound;

  const getInvestmentsByRound = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvestorAnalyticsFundingRoundInvestments(
        authToken
      );
      if (status === 200) {
        setInvestmentsByRound(data?.status?.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const goToInshights = () => {
    routeInsights();
  };
  return (
    <main className="w-1/2 border-[1.5px] bg-white border-neutral-200 rounded-md flex-col p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">$ Invested by Round</span>
        <span
          onClick={goToInshights}
          className="font-bold  text-[#155E75] text-xs flex justify-end cursor-pointer"
        >
          See more Insights
        </span>
      </div>
      {loading ? (
        <aside className="relative h-full">
          <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
            <Spinner />
          </div>
        </aside>
      ) : (
        <aside className="  w-full py-5 inline-flex">
          <div className="h-full w-full flex-col items-center px-4">
            <div className="flex justify-between py-2 ">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#294c57] px-1.5 h-3 rounded-sm"></span>
                <span>Mezzanine & bridge</span>
              </span>
              <span className="font-medium text-[#667085]">{mezzanineBridge}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                {" "}
                <span className="w-1 bg-[#315b68] px-1.5 h-3 rounded-sm"></span>
                <span>Pre Seed </span>
              </span>
              <span className="font-medium text-[#667085]">{preSeed}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#396a79] px-1.5 h-3 rounded-sm"></span>
                <span>Seed / Angel</span>
              </span>
              <span className="font-medium text-[#667085]">
                {seedAngel}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#417a8b] px-1.5 h-3 rounded-sm"></span>
                <span>Series A</span>
              </span>
              <span className="font-medium text-[#667085]">{seriesA}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#49899c] px-1.5 h-3 rounded-sm"></span>
                <span>Series B</span>
              </span>
              <span className="font-medium text-[#667085]">{seriesB}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#5298ad] px-1.5 h-3 rounded-sm"></span>
                <span>Series C</span>
              </span>
              <span className="font-medium text-[#667085]">{seriesC}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#63a2b6] px-1.5 h-3 rounded-sm"></span>
                <span>Series D</span>
              </span>
              <span className="font-medium text-[#667085]">{seriesD}</span>
            </div>
          </div>

          <aside className="p-2 w-48 ">
            <DoghnutGraph
              data={[
                mezzanineBridge,
                preSeed,
                seedAngel,
                seriesA,
                seriesB,
                seriesC,
                seriesD,
              ]}
              backgroundColor={[
                "#294c57",
                "#315b68",
                "#396a79",
                "#417a8b",
                "#49899c",
                "#5298ad",
                "#63a2b6",
              ]}
            />
          </aside>
        </aside>
      )}
    </main>
  );
};
export default InvestedByRound;
