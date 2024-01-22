import { useSelector } from "react-redux";
import { getInvestorAnalyticsFundingRoundInvestments, getInvestorAnalyticsInvestments, getInvestorAnalyticsInvestmentsChart, getInvestorAnalyticsPropertyInvestments } from "../../../../../apis/investor.api";
import PerfomanceGraph from "../../../PerfomanceGraph";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { useEffect, useState } from "react";
const Graph = ({}: any) :any => {
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
        setGraphData(data?.status?.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
   
  console.log(graphData)

    return <PerfomanceGraph/>
};
export default Graph;
