import ComparedToOther from "./ComparedToOther";
import TopMarketKanz from "./TopMarketsKanz";
import YourTopMarkets from "./YourTopMarkets";
import YourTopSyndicate from "./YourTopSyndicate";


const Insights = ({}: any): any => {
  return (
    <main className="py-3">
      <section className="w-full flex gap-4 justify-between items-stretch">
        <YourTopSyndicate/>
        <ComparedToOther/>
      </section>
      <section className="w-full flex gap-4 justify-between items-center mt-5">
        <YourTopMarkets/>
        <TopMarketKanz/>
      </section>
    </main>
  );
};
export default Insights;
