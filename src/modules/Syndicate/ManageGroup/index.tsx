import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import { KanzRoles } from "../../../enums/roles.enum";
import { toastUtil } from "../../../utils/toast.utils";
import { toast } from "react-toastify";
import Spinner from "../../../shared/components/Spinner";

import {
  comaFormattedNumber,
  numberFormatter,
} from "../../../utils/object.utils";
import Modal from "../../../shared/components/Modal";
import Table from "../../../shared/components/Table";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import CustomStatus from "../../../shared/components/CustomStatus";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import ManageGroupActionsIcon from "../../../ts-icons/ManageGroupActionsIcon.svg";
import {
  delRemoveInvestor,
  getGroupInvestors,
  getNonAddedInvestors,
  postAddInvestor,
} from "../../../apis/syndicate.api";




const ManageGroup = ({  }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groupInvestors, setGroupInvestors] = useState([]);

  const language: any = useSelector((state: RootState) => state.language.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab]: any = useState("all");
  const [searchText, setSearchText] = useState("");

  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setmodalLoading] = useState(false);
  const [investors, setInvestors] = useState<any>([]);
  const [filter, setFilterCounts]:any = useState([]);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [searchModalQuery, setModalSearchQuery]: any = useState("");
  const [openedActionDiv, setOpenedActionDiv] = useState<number | null>(null);



  const [tabs] = useState(["All", "Added", "Follower"]);
  const columns = [
    "Investor",
    "Invested",
    "Investments",
    "Join Status",
    "Join Date",
    "Action",
  ];
  const [pagination, setPagination] = useState({
    items_per_page: 10,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });

  useEffect(()=>{
    getMembers()
  },[openedActionDiv])

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getMembers();
  }, [selectedTab]);

  const ActionButton = ({ investorID }: any): any => {
    const [openActions, setOpenActions] = useState(false);
    const ref: any = useRef();
  
    useEffect(() => {
      const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenedActionDiv(null);
        }
      };
  
      window.addEventListener("click", handleOutsideClick);
  
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }, []);
    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setOpenedActionDiv((prev) => (prev === investorID ? null : investorID));
    };
    return (
      <div className="relative">
        <div
          onClick={handleButtonClick}
          className="inline-flex items-center  justify-center  w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent"
          ref={ref}
        >
          <ManageGroupActionsIcon />
        </div>
        {openedActionDiv === investorID && (
          <div className="overflow-hidden justify justify-center shadow-lg  rounded-md  flex-col bg-white border-[1px] border-neutral-200   z-[20] fixed items-center font-normal bg-red text-left">
            <div
              onClick={() => {}}
              className="w-full items-center p-3 hover:bg-[#F5F5F5]"
            >
              View details
            </div>
            <div
              onClick={() => {
                setLoading(true);
                onDeleteInvestor(user.id, investorID);
              }}
              className="w-full items-center p-3 hover:bg-[#F5F5F5]"
            >
              Remove
            </div>
          </div>
        )}
      </div>
    );
  };
  const getMembers = async () => {
    try {
      let { status, data } = await getGroupInvestors(authToken, selectedTab,searchQuery);

      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats)
        let investors = data?.status?.data?.members?.map((investor: any) => {  
          return {
            id: investor?.id,
            filterStatus: investor?.status,
            ["Investor"]: investor?.member_name || "N/A",
            ["Invested"]: `$${comaFormattedNumber(investor?.invested_amount)}`,
            ["Investments"]: `${numberFormatter(
              Number(investor?.no_investments)
            )}`,
            ["Join Status"]:
              <CustomStatus options={investor?.connection} /> || "N/A",
            ["Join Date"]:
              <span className="px-2">{investor?.joining_date}</span> || " N/A",
            Steps: investor?.current_state?.steps,
            ["Action"]: <ActionButton investorID={Number(investor?.id)} />,
          };
        });

        setPagination((prev) => {
          return {
            ...prev,
            total_items: investors.length,
            current_page: 1,
            total_pages: Math.ceil(investors.length / prev.items_per_page),
            data: investors?.slice(0, prev.items_per_page),
          };
        });

        setGroupInvestors(investors);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 302) {
        //   toast.dismiss();
        //   toast.error("Session time out", toastUtil);
        //  dispatch(saveToken(""));
        // navigate(RoutesEnums.LOGIN);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const getCountvalue = ( value:string ) =>
  { 
    let count = 0 ;
    switch (value) {
      case  "All" : 
      count = filter?.all
      break
      case  "Added" : 
      count = filter?.added
      break
      case  "Follower" : 
      count = filter?.follower
      break
    } 

    return count
    
  }

  const paginate = (type: string) => {
    if (type === "next" && pagination.current_page < pagination.total_pages) {
      setPagination((prev: any) => {
        const nextPage = prev.current_page + 1;
        const startIndex = (nextPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = groupInvestors.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = groupInvestors.slice(startIndex, endIndex);
        return { ...prev, current_page: prevPage, data };
      });
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = groupInvestors.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  useEffect(() => {
    getAllUserListings();
  }, []);

  const onDeleteInvestor = async (currSyndId: any, investorID: any) => {
    try {
      const { status } = await delRemoveInvestor(
        currSyndId,
        investorID,
        authToken
      );
      if (status === 200) {
        toast.dismiss();
        toast.success("Investor Deleted", toastUtil);
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      getMembers();
    }
  };

  const onAddInvestor = async (currSyndId: any, investorID: any ) => {

    try {
      setLoading(true);
      const { status } = await postAddInvestor(
        {
          member_id: investorID,
          member_type: "Investor",
          connection: "added",
        },
        currSyndId,
        authToken
      );
      if (status === 200) {
        toast.dismiss();
        toast.success("Investor Added", toastUtil);
        const dataCopy = [...investors]
        const index = dataCopy.findIndex(item => item.id === investorID);
        dataCopy[index].status = true
        
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      getMembers();
    }
  };

  const getAllUserListings = async () => {
    try {
      setmodalLoading(true);
      let { status, data } = await getNonAddedInvestors(authToken, searchModalQuery);
      if (status === 200) {
        let investorData = data?.status?.data || [];
        let investors: any = investorData.map((investor: any) => ({
          id: investor?.id,
          member_name: <span className="capitalize">{investor?.name}</span>,
          profileImage: investor?.image,
          invested_amount: investor?.invested_amount,
          no_investments: investor?.no_investments,
          status: false,
        }));

        setInvestors(investors);
      }
    } catch (error: any) {
      console.log(error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.status === 400
      ) {
        toast.dismiss();
        toast.warn("Already Invited", toastUtil);
      }
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.FUNDRAISER_DASHBOARD });
      }
    } finally {
      setmodalLoading(false);
    }
  };


  return (
    <>
      <main className="h-full max-h-full overflow-y-auto">
        <section>
          <Header />
        </section>
        <aside className="w-full h-full flex items-start justify-start">
          <Sidebar type={KanzRoles.SYNDICATE} />
          <section
            className="bg-cbc-auth h-full p-[5rem] relative"
            style={{ width: "calc(100% - 250px)" }}
          >
            {loading ? (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  zIndex: 50,
                }}
                className="absolute left-0 top-0 w-full h-full grid place-items-center"
              >
                <Spinner />
              </div>
            ) : (
              <React.Fragment>
                <section className="inline-flex justify-between items-center w-full">
                  <div className="w-full">
                    <h1 className="text-black font-medium text-2xl mb-2">
                      {"Manage Group"}
                    </h1>

                    <span className="w-full flex items-center gap-5">
                    <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden min-w-[300px] inline-flex items-center px-2">
                      <SearchIcon
                        onClick={() => {
                          getMembers();
                        }}
                      />
                      <input
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          getMembers();
                        }
                      }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        className="h-full w-full outline-none pl-2 text-sm font-normal "
                        placeholder={"Search for investors"}
                      />
                    </div>

                      <ul className="inline-flex items-center">
                        {React.Children.toArray(
                          tabs.map((tab: any) => (
                            <li
                              onClick={() => {
                                setSelectedTab(tab);
                              }}
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
                  <Button
                    onClick={() => {
                      getAllUserListings();
                      setModalOpen(true);
                    }}
                    className="w-[170px]"
                  >
                    {"+ Add New Member"}
                  </Button>
                </section>
                <section className="mt-10">
                  <Table
                    columns={columns}
                    pagination={pagination}
                    paginate={paginate}
                    goToPage={paginate}
                    noDataNode={
                      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <div className="mb-4 font-medium  text-[#828282]">
                          No Group Member yet
                        </div>
                        <Button
                          onClick={() => setModalOpen(true)}
                          className=" font-extralight"
                        >
                          {"+  Create Group"}
                        </Button>
                      </div>
                    }
                  />
                </section>
              </React.Fragment>
            )}
          </section>
        </aside>
      </main>

      <Modal
        className={"w-[700px] screen1024:w-[300px]"}
        
        show={modalOpen ? true : false}
      >
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[500px] rounded-md p-5 h-full">
            <section>
              <div className="justify-end inline-flex pt-3 px-3 w-full">
                <div
                  className="bg-white h-8 w-8 border-[1px] border-black rounded-md  shadow-cs-6 p-1 cursor-pointer"
                  onClick={() => {
                    setModalSearchQuery("")
                    setModalOpen(false);
                  }}
                >
                  <CrossIcon stroke="#000" />
                </div>
              </div>
            </section>
            <section className="inline-flex justify-between items-center mt-2 w-full">
              <span className="w-full flex items-center gap-5">
              <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden min-w-full inline-flex items-center px-2">
                      <SearchIcon
                        onClick={() => {
                          getAllUserListings();
                        }}
                      />
                      <input
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          getAllUserListings();
                        }
                      }}
                        value={searchModalQuery}
                        onChange={(e) => setModalSearchQuery(e.target.value)}
                        type="search"
                        className="h-full w-full outline-none pl-2 text-sm font-normal "
                        placeholder={"Search for investors"}
                      />
                    </div>
              </span>
            </section>
            {modalLoading ? (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  zIndex: 50,
                }}
                className="absolute left-0 top-0 w-full h-full grid place-items-center"
              >
                <Spinner />
              </div>
            ) : investors.length > 0 ? (
              React.Children.toArray(
                investors
                  .filter((investor: any) =>
                    JSON.stringify(investor.member_name?.props?.children)
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((investor: any , index : number) => (
                    <div className="py-3 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center">
                      <div className=" justify-between items-center w-full">
                        <p>{investor.member_name}</p>
                        <div className="font-sm text-xs font-light">
                          {numberFormatter(investor.invested_amount)} invested
                          in {numberFormatter(investor.no_investments)}{" "}
                          investments
                        </div>
                      </div>
                      <div>
                        {!investor?.status ?  <Button
                divStyle="items-center justify-end max-w-fit"
                type="outlined"
                className="!p-3 !py-1 !rounded-full"
                onClick={() => onAddInvestor(user.id, investor?.id )}
              >
                Add
              </Button> : <Button
                divStyle="items-center justify-end max-w-fit"
                type="outlined"
                className="!p-3 !py-1 !rounded-full"
              >
                Added
              </Button>  }
                        </div>
                    </div>
                  ))
              )
            ) : (
              <div className="flex flex-col items-center justify-start mt-8 space-y-4 font-semibold pb-5">
                All investors invited!
              </div>
            )}
          </aside>
        </div>
      </Modal>
    </>
  );
};
export default ManageGroup;
