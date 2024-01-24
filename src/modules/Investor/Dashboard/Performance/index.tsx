import InvestmentCards from "./InvestmentCards";
import Graph from "./Graph";
import InvestedByRound from "./InvestedByRound";
import InvestedInProperty from "./InvestedInProperty";
import MostRecentActivity from "./MostRecentActivity";
import Investments from "./Investments";
import { useEffect, useState } from "react";

const Performance = ({
  changeTabtoInsights,
  changeTabtoActivity,
}: any): any => {
  const routeInsights = () => {
    changeTabtoInsights();
  };
  const routeActivity = () => {
    changeTabtoActivity();
  };
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <aside className=" border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3">
        <InvestmentCards data={cardData} loading={loading} />
        <section className="mt-10">
          <Graph
            setCardData={setCardData}
            loading={loading}
            setLoading={setLoading}
          />
        </section>
      </aside>
      <aside className="mt-5">
        <div className="flex gap-5">
          <InvestedByRound />
          <InvestedInProperty  />
        </div>
      </aside>
      <aside className="flex justify-between mt-5 gap-5 w-full">
        <MostRecentActivity routeActivity={routeActivity} />
        <MostRecentActivity routeActivity={routeActivity} />
      </aside>
      <aside>
        <Investments />
      </aside>
    </main>
  );
};
export default Performance;
