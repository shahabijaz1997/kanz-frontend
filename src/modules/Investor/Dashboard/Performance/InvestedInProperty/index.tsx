import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DoghnutGraph from "../InvestedByRound/DoghnutGraph";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { getInvestorAnalyticsPropertyInvestments } from "../../../../../apis/investor.api";
import Spinner from "../../../../../shared/components/Spinner";

const InvestedInProperty = ({routeInsights}: any): any => {
  const [loading, setLoading] = useState(false);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [investedInProperty, setInvestedInProperty]:any = useState(null);

  useEffect(() => {
    getInvestedInProperty();
  }, []);
  
  const getInvestedInProperty = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvestorAnalyticsPropertyInvestments(authToken);
      if (status === 200) {
        setInvestedInProperty(data?.status?.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
<main className="w-1/2 border-[1.5px] bg-white border-neutral-200 rounded-md flex-col p-4">
      <div className="flex justify-between items-center">
        <span className="font-medium">$ Invested in Property</span>
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
              <span className="w-1 bg-[#0D485B] px-1.5 h-3 rounded-sm"></span>
              <span>Rented Property</span>
            </span>
            <span className="font-medium text-[#667085]">${investedInProperty?.rental_property}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-light flex items-center text-sm gap-3 text-[#667085]">
              {" "}
              <span className="w-1 bg-[#9FC6D2] px-1.5 h-3 rounded-sm"></span>
              <span>Non rented Property </span>
            </span>
            <span className="font-medium text-[#667085]">${investedInProperty?.non_rental_property}</span>
          </div>
        </div>

        <aside className="p-2 w-48 ">
          {investedInProperty &&(<DoghnutGraph data={[investedInProperty?.rental_property, investedInProperty?.non_rental_property]} backgroundColor={["#0D485B", "#9FC6D2"]} />)}
          
        </aside>
      </aside>
      )}
    </main>
  );
};
export default InvestedInProperty;
