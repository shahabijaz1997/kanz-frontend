import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import DoghnutGraph from "../InvestedByRound/DoghnutGraph";

const InvestedInProperty = ({routeInsights}: any): any => {
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
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              <span className="w-1 bg-[#0D485B] px-1.5 h-3 rounded-sm"></span>
              <span>Angel Round</span>
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              {" "}
              <span className="w-1 bg-[#155E75] px-1.5 h-3 rounded-sm"></span>
              <span>Pre Seed </span>
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              <span className="w-1 bg-[#4D8697] px-1.5 h-3 rounded-sm"></span>
             <span>Seed</span>
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              <span className="w-1 bg-[#9FC6D2] px-1.5 h-3 rounded-sm"></span>
              <span>Series A</span>
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              <span className="w-1 bg-[#E1EFF3] px-1.5 h-3 rounded-sm"></span>
              <span>Other</span>
            </span>
            <span className="font-medium text-[#667085]">$7.4k</span>
          </div>
        </div>

        <aside className="p-2 w-48 ">
          <DoghnutGraph />
        </aside>
      </aside>
    </main>
  );
};
export default InvestedInProperty;
