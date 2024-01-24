import ComparedToOther from "./ComparedToOther";
import TopMarketKanz from "./TopMarketsKanz";
import YourTopMarkets from "./YourTopMarkets";
import YourTopSyndicate from "./YourTopSyndicate";


const Insights = ({}: any): any => {
  return (
    <main className="py-3">
      <section className="w-full flex justify-between items-stretch px-10">
        <YourTopSyndicate/>
        <ComparedToOther/>
      </section>
      <section className="w-full flex justify-between items-center mt-5 px-10">
        <YourTopMarkets/>
        <TopMarketKanz/>
      </section>
    </main>
  );
};
export default Insights;
