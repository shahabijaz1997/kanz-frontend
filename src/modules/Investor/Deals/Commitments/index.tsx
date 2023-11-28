import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../../enums/roles.enum";
import Header from "../../../../shared/components/Header";
import Sidebar from "../../../../shared/components/Sidebar";
import { RootState } from "../../../../redux-toolkit/store/store";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import Table from "../../../../shared/components/Table";
import { RoutesEnums } from "../../../../enums/routes.enum";
import Modal from "../../../../shared/components/Modal";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import { numberFormatter } from "../../../../utils/object.utils";
import Spinner from "../../../../shared/components/Spinner";
import { ApplicationStatus } from "../../../../enums/types.enum";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import EditIcon from "../../../../ts-icons/editIcon.svg";
import CustomStatus from "../../../../shared/components/CustomStatus";
import { getSyndicates } from "../../../../apis/syndicate.api";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { getAllDeals, getCommitedDeals, getInvitees, getInvites } from "../../../../apis/investor.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";



const Commitments = ({}: any) :any => {



    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const user: any = useSelector((state: RootState) => state.user.value);
   /*  const columns = ["Syndicate", "Title", "Category", "Status", "End Date", "Target", ""]; */         // THis is actual values
   const columns = [
    "Syndicate",
    language?.v3?.syndicate?.deals?.table?.title,
    language?.v3?.syndicate?.deals?.table?.category,
    language?.v3?.syndicate?.deals?.table?.end_date,
    "Committed",
    language?.v3?.syndicate?.deals?.table?.target,
    "",
  ];
    const [loading, setLoading]: any = useState(false);
    const [invitees, setInvitees] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [filter, setFilterCounts]:any = useState([]);


    const [pagination, setPagination] = useState({
        items_per_page: 10,
        total_items: [],
        current_page: 1,
        total_pages: 0,
      });
      const [tabs] = useState([
        language?.v3?.startup?.overview?.all,
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
          case  "Startup" : 
          count = filter?.startup
          break
          case  "Property" : 
          count = filter?.property
          break
        } 
    
        return count
        
      }
    
      useEffect(() => {
        dispatch(saveDataHolder(""));
        getAllInvitees();
      }, [selectedTab]);
    
      const getAllInvitees = async () => {
        try {
          setLoading(true);
          let { status, data } = await getCommitedDeals( authToken, selectedTab);
          if (status === 200) {
            setFilterCounts(data?.status?.data?.stats)

            let invitees = data?.status?.data?.deals?.map((invitee: any) => {
              return {
                id: invitee?.id,
                filterStatus: invitee?.status,
                "Syndicate": <span className=" capitalize">{invitee?.syndicate?.name}</span> ,
                [language?.v3?.syndicate?.deals?.table?.title]:
                  invitee?.title || "N/A",
                [language?.v3?.syndicate?.deals?.table?.category]: (
                  <span className="capitalize">{invitee?.deal_type}</span>
                ),
                [language?.v3?.syndicate?.deals?.table?.end_date]:
                  invitee?.end_at || " N/A",
                 ["Committed"] : invitee?.invested_amount, 
                [language?.v3?.syndicate?.deals?.table
                  ?.target]: `$${numberFormatter(Number(invitee?.target))}`,
    
                Steps: invitee?.current_state?.steps,
                [""]: (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(
                        `${RoutesEnums.SYNDICATE_DEAL_DETAIL}/${invitee?.token}`,
                        { state: window.location.pathname }
                      );
                    }}
                    className="bg-neutral-100 inline-flex items-center justify-center w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent"
                  >
                    <Chevrond
                      className="rotate-[-90deg] w-6 h-6"
                      stroke={"#737373"}
                    />
                  </div>
                ),
              };
            });
    
            setPagination((prev) => {
              return {
                ...prev,
                total_items: invitees.length,
                current_page: 1,
                total_pages: Math.ceil(invitees.length / prev.items_per_page),
                data: invitees?.slice(0, prev.items_per_page),
              };
            });
            setInvitees(invitees);
          }
        } catch (error:any) {
          if (error.response && error.response.status === 302) {
         /*    toast.dismiss()
            toast.error("Session time out",toastUtil)
            dispatch(saveToken("")); */
           
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
            const data = invitees.slice(startIndex, endIndex);
            return { ...prev, current_page: nextPage, data };
          });
        } else if (type === "previous" && pagination.current_page > 1) {
          setPagination((prev: any) => {
            const prevPage = prev.current_page - 1;
            const startIndex = (prevPage - 1) * prev.items_per_page;
            const endIndex = startIndex + prev.items_per_page;
            const data = invitees.slice(startIndex, endIndex);
            return { ...prev, current_page: prevPage, data };
          });
        } else {
          setPagination((prev: any) => {
            const prevPage = Number(type) + 1 - 1;
            const startIndex = (prevPage - 1) * prev.items_per_page;
            const endIndex = startIndex + prev.items_per_page;
            const data = invitees.slice(startIndex, endIndex);
    
            return { ...prev, current_page: type, data };
          });
        }
      };
      return(
        <>  
           <section className="inline-flex justify-between items-center w-full">
                        <span className="w-full flex items-center gap-5">
                            <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden min-w-[350px] inline-flex items-center px-2">
                                <SearchIcon />
                                <input type="search" className="h-full w-full outline-none pl-2 text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
                            </div>
                            <ul className="inline-flex items-center">
                            {React.Children.toArray(
                                tabs.map((tab:any) => (
                                <li
                                    onClick={() => setSelectedTab(tab)}
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
             <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
               <p className="font-medium text-center text-lg text-[#828282]">Follow syndicates to get invites</p>
               <p className=" font-normal mt-1 text-sm  text-[#828282]">You can see the invitees here from the following syndicate</p>
               <Button
               onClick={() => navigate(`${RoutesEnums.INVESTOR_SYNDICATES}`)}
               className="mt-4" type="primary">Find Syndicates to Follow</Button>
             </div>
           }
         />
       )}
     </section>
     </>
      )
 
    

};
export default Commitments;
