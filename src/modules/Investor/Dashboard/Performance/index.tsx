
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import ProfitInvestorIcon from "../../../../ts-icons/ProfitInvestorIcon.svg";




const Performance = ({}: any) :any => {

    return (

        <main>
        <div className="w-[30%]">
        <aside className="border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3">
        <div className="mb-2 font-medium text-[#737373] ">Investment Value</div>
        <div className="font-bold text-4xl mb-2">$79.1K</div>
        <div className="mb-2 text-[#737373] ">42 investments - total investment 59.2K</div>
        <div className="w-full flex items-center">
            <div><ProfitInvestorIcon/></div>
            <span className="ml-1 text-[#155E75]">1.09x - </span>
            <span className="ml-1 text-[#737373]">4.1 % IRR</span>
            
        </div>
      </aside>
        </div>
        </main>

          
    
    )
  
    

};
export default Performance;
