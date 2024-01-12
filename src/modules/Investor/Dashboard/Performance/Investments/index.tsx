
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

const Investments = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);    
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const columns = [
    language?.v3?.syndicate?.deals?.table?.title,
    language?.v3?.syndicate?.deals?.table?.category,
    "Status",
    language?.v3?.syndicate?.deals?.table?.end_date,
    "Raised",
    language?.v3?.syndicate?.deals?.table?.target,
    "",
  ];

  const [selectedTab, setSelectedTab]: any = useState("All");
  const [paginationData, setPaginationData]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilterCounts]:any = useState([]);
  const [tabs] = useState([
    "all",
    "Startup",
    "Property",
  ]);
  const getCountvalue = ( value:string ) =>
  { 
    let count = 0 ;
    switch (value) {
      case  "All" : 
      count = filter?.all
      break
      case  "Property" : 
      count = filter?.property
      break
      case  "Startup" : 
      count = filter?.startup
      break
    } 

    return count
    
  }
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, [selectedTab]);

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getLiveDeals(authToken, selectedTab," ", currentPage);
      if (status === 200) {
        setPaginationData(data?.status?.data?.pagy)
        setFilterCounts(data?.status?.data?.stats)
        let deals = data?.status?.data?.deals?.map((deal: any) => {
          return {
            id: deal?.id,
            filterStatus: deal?.status,
            [language?.v3?.syndicate?.deals?.table?.title]:
              deal?.title || "N/A",
            [language?.v3?.syndicate?.deals?.table?.category]: (
              <span className="capitalize">{deal?.deal_type}</span>
            ),
            ["Status"]:
              <CustomStatus options={deal?.status} /> || "N/A",
            [language?.v3?.syndicate?.deals?.table?.end_date]:
              <span className="px-2">{(deal?.end_at)}</span>|| " N/A",
            ["Raised"]:`$${numberFormatter(Number(deal?.raised))}`,  
            [language?.v3?.syndicate?.deals?.table
              ?.target]: `$${numberFormatter(Number(deal?.target))}`,

            Steps: deal?.current_state?.steps,
            [""]: (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(
                    `${RoutesEnums.SYNDICATE_DEAL_DETAIL}/${deal?.token}`,
                    { state: window.location.pathname }
                  );
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent"
              >
             
              </div>
            ),
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

                  <span className="w-full flex items-center gap-5 mt-2">
                    <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                      <SearchIcon />
                      <input
                        type="search"
                        className="h-full w-full outline-none pl-2 pr-[6.5rem] text-sm font-normal text-gray-400"
                        placeholder={language?.v3?.common?.search}
                      />
                    </div>

                    <ul className="inline-flex items-center">
                      {React.Children.toArray(
                        tabs.map((tab:any) => (
                          <li
                            onClick={() => {
                              
                              setSelectedTab(tab)}}
                            className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${
                              selectedTab === tab
                                ? "text-neutral-900 bg-neutral-100"
                                : "text-gray-500"
                            } `}
                          >
                            {tab} &nbsp;({getCountvalue(tab)})
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
