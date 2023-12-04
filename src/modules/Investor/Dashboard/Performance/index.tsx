
import InvestmentCards from "./InvestmentCards";
import Graph from "./Graph";
import InvestedByRound from "./InvestedByRound";
import InvestedInProperty from "./InvestedInProperty";
import MostRecentActivity from "./MostRecentActivity";
import Investments from "./Investments";




const Performance = ({changeTabtoInsights, changeTabtoActivity}: any) :any => {


    const routeInsights = () => {
      changeTabtoInsights(); 
    };
    const routeActivity = () => {
        changeTabtoActivity(); 
    };

    return (
        <main>
        <aside className=" border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3">
        <InvestmentCards/>
        <Graph/>
        </aside>
        <aside className="mt-5">
            <div className="flex gap-5">
            <InvestedByRound routeInsights={routeInsights}/>
            <InvestedInProperty routeInsights={routeInsights}/>
            </div>
         
        </aside>
        <aside className="flex justify-between mt-5 gap-5 w-full">
            <MostRecentActivity routeActivity={routeActivity}/>
            <MostRecentActivity routeActivity={routeActivity}/>
        </aside>
        <aside>
            <Investments/>
        </aside>
        </main>

    
    )
  
    

};
export default Performance;
