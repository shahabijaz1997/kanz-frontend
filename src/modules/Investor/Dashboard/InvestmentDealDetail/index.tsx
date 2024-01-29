import { useEffect, useState } from "react";
import { KanzRoles } from "../../../../enums/roles.enum";
import Header from "../../../../shared/components/Header";
import Sidebar from "../../../../shared/components/Sidebar";
import Spinner from "../../../../shared/components/Spinner"
import Chevrond from "../../../../ts-icons/chevrond.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import DealDescription from "./DealDescription";
import InvestmentDescription from "./InvestmentDescription";
import { getDealChartStats, getInvestorDealDetail } from "../../../../apis/deal.api";

const InvestmentDealDetail = () =>{
    const orientation: any = useSelector(
        (state: RootState) => state.orientation.value
      );
  const language: any = useSelector((state: RootState) => state.language.value);
  const navigate = useNavigate();

  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [loading, setLoading] = useState(false);
   const [deal, setDeal]: any = useState();
   const [dealStats, setDealStats]: any = useState();
    const params = useParams()
    useEffect(() => {
      getDealDetail()
      getChartStats()
    },[params])
    const getDealDetail : any = async () => {    
      try {
        setLoading(true);
        let { status, data } = await getInvestorDealDetail(params?.token, authToken);
        if (status === 200) {
          setDeal(data?.status?.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    const getChartStats : any = async () => {    
      try {
        setLoading(true);
        let { status, data } = await getDealChartStats(params?.token, authToken);
        if (status === 200) {
          setDealStats(data?.status?.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  
    return (
        <main className="h-full max-h-full overflow-y-hidden pb-5">
        <section>
          <Header/>
        </section>
        <aside className="w-full h-full flex items-start justify-start">
          <Sidebar
            type={
              KanzRoles.INVESTOR 
            }
          />
          {loading ? (
            <div
              className="absolute left-0 top-0 w-full h-full grid place-items-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
            >
              <Spinner />
            </div>
          ) : (
              <section
              className="bg-cbc-auth h-full p-[5rem] overflow-y-auto"
              style={{ width: "calc(100% - 250px)" }}
            >
                          <span
              className="inline-flex items-center gap-2 relative top-[-25px] cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <Chevrond
                    className={`${
                      orientation === "rtl"
                        ? "rotate-[-90deg]"
                        : "rotate-[90deg]"
                    } w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
              <small className="text-neutral-500 text-sm font-medium">
                {"Dashboard"}
              </small>
            </span>
              <section className="flex-col flex justify-start items-start w-full mb-6">
                <h1 className="text-black font-medium text-2xl w-full">
                  {deal?.title}
                </h1>
                <p className=" mt-2 text-[#737373]">{deal?.description}</p>
              </section>
              <aside>
                <DealDescription data={deal}/>
              </aside>
              <aside className="mt-5">
                <InvestmentDescription data={dealStats}/>
              </aside>
            </section>
          )}
        </aside>
      </main>
    )
}

export default InvestmentDealDetail