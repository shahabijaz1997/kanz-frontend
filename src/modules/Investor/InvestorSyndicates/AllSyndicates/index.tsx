
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux-toolkit/store/store";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Table from "../../../../shared/components/Table";
import { RoutesEnums } from "../../../../enums/routes.enum";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import Spinner from "../../../../shared/components/Spinner";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import CustomStatus from "../../../../shared/components/CustomStatus";
import { getSyndicates } from "../../../../apis/syndicate.api";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import SyndicateInfoDrawer from "../SyndicateInfoDrawer";
import { getSyndicateInfo } from "../../../../apis/investor.api";



const AllSyndicates = ({}: any) :any => {

  

  const [childData, setChildData]:any = useState(null);
  
  const handleChildData = (data:any) => {
    setChildData(data);
  };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);

    const columns = ["Syndicate", "Total Deals", "Active Deals", "Raising Fund", "Formation Date", ""];
    const [loading, setLoading]: any = useState(false);
    const [invites, setInvites]: any = useState([]);
    const [syndicateInfo, setsyndicateInfo]: any = useState(null);
    const [isOpen, setOpen]: any = useState(false);
  const [searchQuery, setSearchQuery]: any = useState("");

    
    const [pagination, setPagination] = useState({
        items_per_page: 5,
        total_items: [],
        current_page: 1,
        total_pages: 0,
      });
    
   
      
      useEffect(() => {
        dispatch(saveDataHolder(""));
        getAllSyndicates();
      }, []);
      useEffect(()=>{
        syndicateInfo?.id && onGetSyndicateDetail(syndicateInfo?.id)
        setChildData(false)
      },[childData])


      const onGetSyndicateDetail = async (id:any) => {
        try {
          setLoading(true);
          let { status, data } = await getSyndicateInfo(authToken, id);
          if (status === 200) setsyndicateInfo(data?.status?.data);
        } catch (error) {
        } finally {
          setLoading(false);
          
        }
      };
    const getAllSyndicates = async () => {
        try {
          setLoading(true);
          let { status, data } = await getSyndicates(authToken,searchQuery);
          if (status === 200) {
            let deals = data?.status?.data
              ?.filter((syndicate: any) => syndicate?.status !== "pending")
              .map((syndicate: any) => {
                return {
                  id: syndicate?.id,
                  ["Syndicate"]: (
                    <span className=" capitalize">{syndicate?.name}</span>
                  ),
                  ["Total Deals"]: (
                    <span className=" capitalize">{syndicate?.total_deals}</span>
                  ),
                  ["Active Deals"]: (
                    <span className=" capitalize">{syndicate?.active_deals}</span>
                  ),
                  ["Raising Fund"]: (
                    <span className=" capitalize">{syndicate?.raising_fund ? (<CustomStatus options={"Yes"} />) : (<CustomStatus options={"No"} />)}</span>
                  ),
                  ["Formation Date"]: (
                    <span className=" capitalize">{syndicate?.created_at}</span>
                  ),
                  [""]: (
                    <div
                    onClick={() => {
                      onGetSyndicateDetail(syndicate?.id)
                      setOpen(true)
                     
                    }}
                      className="bg-neutral-100 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent mr-10"
                    >
                      <Chevrond
                        className="rotate-[-90deg] w-6 h-6"
                        stroke={"#737373"}
                      />
                    </div>
                  )
                   
                };
              });
    
            setPagination((prev) => {
              return {
                ...prev,
                total_items: deals.length,
                current_page: 1,
                total_pages: Math.ceil(deals.length / prev.items_per_page),
                data: deals?.slice(0, prev.items_per_page),
              };
            });
            setInvites(deals);
          }
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            dispatch(saveToken(""));
            navigate(RoutesEnums.LOGIN, { state: RoutesEnums.FUNDRAISER_DASHBOARD });
          }
        } finally {
          setLoading(false);
        }
      };

      const paginate = (type: string) => {
        if (type === "next" && pagination.current_page < pagination.total_pages) {
          setPagination((prev: any) => {
            const nextPage = prev.current_page + 1;
            const startIndex = (nextPage - 1) * prev.items_per_page;
            const endIndex = startIndex + prev.items_per_page;
            const data = invites.slice(startIndex, endIndex);
            return { ...prev, current_page: nextPage, data };
          });
        } else if (type === "previous" && pagination.current_page > 1) {
          setPagination((prev: any) => {
            const prevPage = prev.current_page - 1;
            const startIndex = (prevPage - 1) * prev.items_per_page;
            const endIndex = startIndex + prev.items_per_page;
            const data = invites.slice(startIndex, endIndex);
    
            return { ...prev, current_page: prevPage, data };
          });
        } else {
          setPagination((prev: any) => {
            const prevPage = Number(type) + 1 - 1;
            const startIndex = (prevPage - 1) * prev.items_per_page;
            const endIndex = startIndex + prev.items_per_page;
            const data = invites.slice(startIndex, endIndex);
    
            return { ...prev, current_page: type, data };
          });
        }
      };
    
      return(
        <>  
           <section className="inline-flex justify-between items-center w-full">
                        <span className="w-full flex items-center gap-5">
                        <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                      <SearchIcon
                        onClick={() => {
                          getAllSyndicates();
                        }}
                      />
                      <input
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          getAllSyndicates();
                        }
                      }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        className="h-full w-full outline-none pl-2 text-sm font-normal "
                        placeholder={language?.v3?.common?.search}
                      />
                    </div>

                        </span>
                    </section>
        <section className="mt-5 relative">
       {loading ? (
         <div
           className="absolute left-0 top-0 w-full h-full grid place-items-center"
           style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
         >
           <Spinner />
         </div>
       ) : (
         <Table
           columns={columns}
           pagination={pagination}
           goToPage={paginate}
           paginate={paginate}
           noDataNode={
             <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
               No invites sent! Click on the{" "}
               <span className=" font-bold">invite button on top right</span> to
               invite a syndicate
             </span>
           }
         />
       )}
     </section>
     <SyndicateInfoDrawer syndicateInfo={syndicateInfo} openDrawer={isOpen} isDrawerOpen={setOpen} onData={handleChildData} />
     </>
      )
 
    

};
export default AllSyndicates;
