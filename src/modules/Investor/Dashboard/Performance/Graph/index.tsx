import { useSelector } from "react-redux";
import { getInvestorAnalyticsFundingRoundInvestments, getInvestorAnalyticsInvestments, getInvestorAnalyticsInvestmentsChart, getInvestorAnalyticsPropertyInvestments } from "../../../../../apis/investor.api";
import PerfomanceGraph from "../../../PerfomanceGraph";
import { RootState } from "../../../../../redux-toolkit/store/store";
import React, { useEffect, useState } from "react";
import Spinner from "../../../../../shared/components/Spinner";
const Graph = ({}: any) :React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  useEffect(() => {
    getGraphData();
  }, []);
  
  const getGraphData = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvestorAnalyticsInvestmentsChart(authToken);
      if (status === 200) {
        setGraphData(data?.status?.data?.records);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      }
    } finally {
      setLoading(false)
    }
  };
   
  console.log(graphData)

    
  return loading ? (
      <div
        className="relative w-full h-full left-0 top-0 grid place-items-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
      >
        <Spinner />
      </div>
    ) : ( 
    <PerfomanceGraph data={graphData} />
    )
    
};
export default Graph;
