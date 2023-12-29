import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../shared/components/Button";
import { RootState } from "../../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../../enums/routes.enum";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import { toastUtil } from "../../../../utils/toast.utils";
import { toast } from "react-toastify";
import Spinner from "../../../../shared/components/Spinner";
import ActionButton from "./../ActionButton";

import {
  comaFormattedNumber,
} from "../../../../utils/object.utils";
import Table from "../../../../shared/components/Table";

import CustomStatus from "../../../../shared/components/CustomStatus";
import {
  getGroupInvestors,
  getNonAddedInvestors,
  postAddInvestor,
} from "../../../../apis/syndicate.api";
import InvestorInfoDrawer from "./InvestorInfoDrawer";

const Applications = ({openModal,reloadMembers}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groupInvestors, setGroupInvestors]:any = useState([]);

  const language: any = useSelector((state: RootState) => state.language.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const [selectedTab, setSelectedTab]: any = useState("all");
  const [searchText, setSearchText] = useState("");

  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setmodalLoading] = useState(false);
  const [investors, setInvestors] = useState<any>([]);
  const [investorInfo, setInvestorInfo] = useState<any>([]);
  const [filter, setFilterCounts]: any = useState([]);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
  const [searchModalQuery, setModalSearchQuery]: any = useState("");
  const [buttonDisable, setButtonDisable]: any = useState(false);
  const [isOpen, setOpen]: any = useState(false);


  const setLoadingFalse = () => {
    setLoading(false);
  };
  const setLoadingTrue = () => {
    setLoading(true);
  };

  const [tabs] = useState<any>({
    'pending': language?.v3?.startup?.overview?.all,
    'approved': language?.v3?.syndicate?.added,
  });
  const columns = [
    language?.v3?.syndicate?.investor,
    language?.v3?.syndicate?.invested,
    language?.v3?.syndicate?.investments,
    language?.v3?.syndicate?.join_status,
    language?.v3?.syndicate?.join_date,
    language?.v3?.syndicate?.action,
  ];

  useEffect(() => {
    const firstTabKey = Object.keys(tabs)[0];
    setSelectedTab(firstTabKey);
  }, [reloadMembers]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1);
    getMembers();
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getMembers();
  }, [currentPage]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getMembers();
  }, [reloadMembers]);

  const getMembers = async () => {
    setLoading(true);
    try {
      let { status, data } = await getGroupInvestors(
        authToken,
        selectedTab,
        searchQuery,
        currentPage
      );

      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy);
        setFilterCounts(data?.status?.data?.stats);
        let investors = data?.status?.data?.records?.map((investor: any) => {
          return {
            id: investor?.id,
            filterStatus: investor?.status,
            [ language?.v3?.syndicate?.investor]: investor?.member_name || "N/A",
            [ language?.v3?.syndicate?.invested]: `$${comaFormattedNumber(investor?.invested_amount)}`,
            [ language?.v3?.syndicate?.investments]: investor?.no_investments,
            [ language?.v3?.syndicate?.join_status]:
              <CustomStatus options={investor?.connection} /> || "N/A",
            [ language?.v3?.syndicate?.join_date]:
              <span className="px-2">{investor?.joining_date}</span> || " N/A",
            Steps: investor?.current_state?.steps,
            [ language?.v3?.syndicate?.action]: (
              <ActionButton
                investorID={Number(investor?.id)}
                setLoading={setLoading}
                setLoadingTrue={setLoadingTrue}
                setLoadingFalse={setLoadingFalse}
                getMembers={getMembers}
              />
            ),
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
  const getCountvalue = (value: string) => {
    return filter[value] || 0
  };

  useEffect(() => {
    getAllUserListings();
  }, []);

  const handleRowClick = (row:any) => {
    setInvestorInfo(row)
    investorInfo && setOpen(true)

  }
   

  const getAllUserListings = async () => {
    try {
      setmodalLoading(true);
      let { status, data } = await getNonAddedInvestors(
        authToken,
        searchModalQuery
      );
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
        toast.warn(language?.v3?.syndicate?.already_invited, toastUtil);
      }
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, {
          state: RoutesEnums.FUNDRAISER_DASHBOARD,
        });
      }
    } finally {
      setmodalLoading(false);
    }
  };

  return (
    <>
      <main className="h-full min-h-full">
       
        <aside className="w-full pb-28 flex items-start justify-start">
          <section
            className="bg-cbc-auth h-full relative w-full"
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
                    <span className="w-full flex items-center gap-5">
                      <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden min-w-[300px] inline-flex items-center px-2">
                        <SearchIcon
                          onClick={() => {
                            getMembers();
                          }}
                        />
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              getMembers();
                            }
                          }}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          type="search"
                          className="h-full w-full outline-none pl-2 text-sm font-normal "
                          placeholder={ language?.v3?.syndicate?.search_for_investors}
                        />
                      </div>

                      <ul className="inline-flex items-center">
                        {React.Children.toArray(
                         Object.keys(tabs).map((tab: any) => (
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
                              {tabs[tab]} &nbsp;({getCountvalue(tab)})
                            </li>
                          ))
                        )}
                      </ul>
                    </span>
                  </div>
                </section>
                <section className="mt-10">
                  <Table
                    columns={columns}
                    onclick= {handleRowClick}
                    tableData={groupInvestors}
                    setCurrentPage={setCurrentPage}
                    paginationData={paginationData}
                    noDataNode={
                      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <div className="mb-4 font-medium  text-[#828282]">
                        {language?.v3?.syndicate?.no_group_member_yet}
                        </div>
                        <Button
                          onClick={openModal}
                          className=" font-extralight"
                        >
                          {language?.v3?.syndicate?.create_group}
                        </Button>
                      </div>
                    }
                  />
                </section>
              </React.Fragment>
            )}
          </section>
        </aside>
        <InvestorInfoDrawer
         investorInfo={investorInfo}
         openDrawer={isOpen}
         isDrawerOpen={setOpen}
        />
      </main>

    </>
  );
};
export default Applications;
