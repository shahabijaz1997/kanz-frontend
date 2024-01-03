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

import { comaFormattedNumber } from "../../../../utils/object.utils";
import Table from "../../../../shared/components/Table";

import CustomStatus from "../../../../shared/components/CustomStatus";
import {
  getInvestorInfo,
  getNonAddedInvestors,
  postAddInvestor,
} from "../../../../apis/syndicate.api";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import SyndicateInfoDrawer from "../../../Investor/InvestorSyndicates/SyndicateInfoDrawer";
import InvestorInfoDrawer from "../Applications/InvestorInfoDrawer";

const AllInvestors = ({ openModal, reloadMembers }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const [loading, setLoading]: any = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [modalLoading, setmodalLoading] = useState(false);
  const [searchModalQuery, setModalSearchQuery]: any = useState("");
  const [searchText, setSearchText] = useState("");
  const [isOpen, setOpen]: any = useState(false);

  const [investors, setInvestors] = useState<any>([]);
  const [investorInfo, setInvestorInfo] = useState<any>(null);
  const [buttonDisable, setButtonDisable]: any = useState(false);
  const [paginationData, setpaginationData] = useState(null);

  const columns = [
    language?.v3?.syndicate?.investor,
    language?.v3?.syndicate?.invested,
    language?.v3?.syndicate?.investments,
    "",
  ];
  const [tabs] = useState<any>({
    all: language?.v3?.startup?.overview?.all,
    added: language?.v3?.syndicate?.added,
    follower: language?.v3?.syndicate?.follower,
  });
  const [searchQuery, setSearchQuery]: any = useState("");

  const [selectedTab, setSelectedTab]: any = useState("all");
  const [filter, setFilterCounts]: any = useState([]);
  const ongetInvestorInfo = async (id: any) => {
    try {
      setLoading(true);
      let { status, data } = await getInvestorInfo(authToken, id);
      if (status === 200) setInvestorInfo(data?.status?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onAddInvestor = async (currSyndId: any, investorID: any) => {
    try {
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
        toast.success(language?.v3?.syndicate?.investor_added, toastUtil);
        const dataCopy = [...investors];
        const index = dataCopy.findIndex((item) => item.id === investorID);
        dataCopy[index].status = true;
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
      setButtonDisable(false);
    } finally {
      setButtonDisable(false);
    }
  };

  const getAllUserListings = async () => {
    try {
      setLoading(true);
      let { status, data } = await getNonAddedInvestors(
        authToken,
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
            [language?.v3?.syndicate?.investor]: investor?.name || "N/A",
            [language?.v3?.syndicate?.invested]: `$${comaFormattedNumber(
              investor?.invested_amount
            )}`,
            [language?.v3?.syndicate?.investments]: investor?.no_investments,
            [language?.v3?.syndicate?.join_status]:
              <CustomStatus options={investor?.connection} /> || "N/A",
            [language?.v3?.syndicate?.join_date]:
              <span className="px-2">{investor?.joining_date}</span> || " N/A",
            [""]: (
              <div
                onClick={() => {
                  ongetInvestorInfo(investor?.id);
                  setInvestorInfo(investor);
                  setOpen(true);
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent mx-2"
              >
                <Chevrond
                  className={`${
                    orientation === "rtl"
                      ? "rotate-[-270deg]"
                      : "rotate-[-90deg]"
                  } w-4 h-4`}
                  strokeWidth={2}
                  stroke={"#000"}
                />
              </div>
            ),
          };
        });
        setInvestors(investors);
        console.log(investors);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUserListings();
  }, []);

  useEffect(() => {
    getAllUserListings();
  }, [currentPage]);

  return (
    <>
      <main className="h-full min-h-full">
        <aside className="w-full pb-28 flex items-start justify-start">
          <section className="bg-cbc-auth h-full relative w-full">
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
                            getAllUserListings();
                          }}
                        />
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              getAllUserListings();
                            }
                          }}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          type="search"
                          className="h-full w-full outline-none pl-2 text-sm font-normal "
                          placeholder={
                            language?.v3?.syndicate?.search_for_investors
                          }
                        />
                      </div>
                      {/* 
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
                          </ul> */}
                    </span>
                  </div>
                </section>
                <section className="mt-10">
                  <Table
                    columns={columns}
                    tableData={investors}
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
export default AllInvestors;
