
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../../redux-toolkit/store/store";
import SearchIcon from "../../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Table from "../../../../../shared/components/Table";
import { RoutesEnums, StartupRoutes } from "../../../../../enums/routes.enum";
import { saveDataHolder } from "../../../../../redux-toolkit/slicer/dataHolder.slicer";
import {  getLiveDeals } from "../../../../../apis/deal.api";
import {
  numberFormatter,
} from "../../../../../utils/object.utils";
import Spinner from "../../../../../shared/components/Spinner";
import CustomStatus from "../../../../../shared/components/CustomStatus";
import { getInvestorAnalyticsInvestments } from "../../../../../apis/investor.api";
import MultipleDecider from "./MultipleDecider";
import Search from "../../../../../shared/components/Search";

const Investments = ({}: any) => {
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);    
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const columns = [
    language?.v3?.syndicate?.deals?.table?.title,
    language?.v3?.syndicate?.deals?.table?.category,
    "Status",
    "Invest Date",
    "Invested",
    "Net Value",
    "Multiple",
    ""
  ];

  const [selectedTab, setSelectedTab]: any = useState("all");
  const [paginationData, setPaginationData]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilterCounts]:any = useState([]);
  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    'startup': language?.v3?.fundraiser?.startup,
    'property': language?.v3?.fundraiser?.property,
  });
  const [searchQuery, setSearchQuery]: any = useState("");
  const getCountvalue = ( value:string ) =>
  { 
    return filter[value] || 0
  }
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals(searchQuery);
  }, [selectedTab]);

  const getAllDeals = async (queryString:string) => {
    try {
      setLoading(true);
      let { status, data } = await getInvestorAnalyticsInvestments(authToken, queryString , currentPage , selectedTab);
      if (status === 200) {
        setPaginationData(data?.status?.data?.pagy)
        setFilterCounts(data?.status?.data?.stats)
        let deals = data?.status?.data?.records?.map((deal: any) => {
          return {
            id: deal?.id,
            filterStatus: deal?.status,
            [language?.v3?.syndicate?.deals?.table?.title]:
              deal?.deal_title || "N/A",
            [language?.v3?.syndicate?.deals?.table?.category]: (
              <span className="capitalize">{deal?.deal_category}</span>
            ),
            ["Status"]:
              <CustomStatus options={deal?.deal_status} /> || "N/A",
            ["Invest Date"]:
              <span className="px-2">{(deal?.investment_date)}</span>|| " N/A",
            ["Invested"]:`$${numberFormatter(Number(deal?.invested_amount))}`,  
            [language?.v3?.syndicate?.deals?.table
              ?.target]: `$${numberFormatter(Number(deal?.target))}`,
            ["Net Value"]: `$${numberFormatter(Number(deal?.net_value))}`,
            ["Multiple"]: <MultipleDecider multiple={deal?.multiple} />,
          };
        });

        setDeals(deals);
      }
    } catch (error:any) {
      if (error.response && error.response.status === 302) {

      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className=" relative h-full w-full max-h-full mt-4">
      <aside className="w-full h-full">
          {loading ? (
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-lg mb-2">
                    {"Investments"}
                  </h1>

                 <span className="w-full flex items-center gap-5">
        <Search apiFunction={getAllDeals} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <ul className="inline-flex items-center">
            {React.Children.toArray(
               Object.keys(tabs).map((tab: any) => (
                <li
                  onClick={() => setSelectedTab(tab)}
                  className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${
                    selectedTab === tab
                      ? "text-neutral-900 bg-neutral-100"
                      : "text-gray-500"
                  } `}
                >
                 {tabs[tab]} &nbsp;({getCountvalue(tab)})
                </li>
              ))
            )}
          </ul>
        </span>
                </div>
              </section>

              <section className="mt-5">
                <Table
                  tableData={deals}
                  paginationData={paginationData}
                  setCurrentPage={setCurrentPage}
                  columns={columns}
                />
              </section>
            </React.Fragment>
          )}
       
      </aside>


    </main>
  );
};
export default Investments;
