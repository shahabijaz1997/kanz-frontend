import { useState } from "react";
import DoghnutGraph from "./DoghnutGraph";

const InvestedByRound = ({routeInsights}: any): any => {
    const goToInshights = () => {
        routeInsights(); 
      };
  return (
<main className="w-1/2 border-[1.5px] bg-white border-neutral-200 rounded-md flex-col p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">$ Invested by Round</span>
        <span onClick={
        goToInshights
        } className="font-bold  text-[#155E75] text-xs flex justify-end cursor-pointer">
          See more Insights
        </span>
      </div>
      <aside className="  w-full py-5 inline-flex">
        <div className="h-full w-full flex-col items-center px-4">
          <div className="flex justify-between py-2 ">
            <span className="font-light  text-sm text-[#667085]">
              <span className="w-2 mr-6  bg-[#0D485B] px-2 rounded-sm"></span>
              Angel Round
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light text-sm text-[#667085]">
              {" "}
              <span className="w-2 mr-6  bg-[#155E75] px-2 rounded-sm"></span>
              Pre Seed
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light text-sm text-[#667085]">
              <span className="w-2 mr-6  bg-[#4D8697] px-2 rounded-sm"></span>
              Seed
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light text-sm text-[#667085]">
              <span className="w-2 mr-6  bg-[#9FC6D2] px-2 rounded-sm"></span>
              Series A
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light text-sm text-[#667085]">
              <span className="w-2 mr-6  bg-[#E1EFF3] px-2 rounded-sm"></span>
              Other
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
        </div>

        <aside className="ml-8 p-2 w-48 ">
          <DoghnutGraph />
        </aside>
      </aside>
    </main>
  );
};
export default InvestedByRound;
