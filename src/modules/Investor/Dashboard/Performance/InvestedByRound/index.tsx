import { useEffect, useState } from "react";
import DoghnutGraph from "./DoghnutGraph";
import {
  getInvestorAnalyticsFundingRoundInvestments,
  getInvestorAnalyticsInvestments,
} from "../../../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux-toolkit/store/store";
import Spinner from "../../../../../shared/components/Spinner";
import { comaFormattedNumber } from "../../../../../utils/object.utils";
import { DealCheckType } from "../../../../../enums/types.enum";

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
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(mezzanineBridge, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                {" "}
                <span className="w-1 bg-[#315b68] px-1.5 h-3 rounded-sm"></span>
                <span>Pre Seed </span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(preSeed, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#396a79] px-1.5 h-3 rounded-sm"></span>
                <span>Seed / Angel</span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(seedAngel, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#417a8b] px-1.5 h-3 rounded-sm"></span>
                <span>Series A</span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(seriesA, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#49899c] px-1.5 h-3 rounded-sm"></span>
                <span>Series B</span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(seriesB, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#5298ad] px-1.5 h-3 rounded-sm"></span>
                <span>Series C</span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(seriesC, DealCheckType.STARTUP)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
                <span className="w-1 bg-[#63a2b6] px-1.5 h-3 rounded-sm"></span>
                <span>Series D</span>
              </span>
              <span className="font-medium text-[#667085]">
                {comaFormattedNumber(seriesD, DealCheckType.STARTUP)}
              </span>
            </div>
          </div>

          <aside className="p-2 w-48 ">
          {investmentsByRound && (
            (
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
            )
          )}
          </aside>
        </aside>
      )}
    </main>
  );
};
export default InvestedByRound;
