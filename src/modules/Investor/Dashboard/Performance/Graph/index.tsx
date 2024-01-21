import { useSelector } from "react-redux";
import { getInvestorAnalyticsFundingRoundInvestments, getInvestorAnalyticsInvestments, getInvestorAnalyticsInvestmentsChart, getInvestorAnalyticsPropertyInvestments } from "../../../../../apis/investor.api";
import PerfomanceGraph from "../../../PerfomanceGraph";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { useEffect, useState } from "react";
const Graph = ({}: any) :any => {
    const [graphData, setGraphData] = useState(null);
  const authToken: any = useSelector((state: RootState) => state.auth.value);


    return <PerfomanceGraph/>
};
export default Graph;
