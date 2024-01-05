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
  getApplicationInvestorInfo,
  getGroupInvestors,
  getInvestorInfo,
  getInvitesSent,
  getNonAddedInvestors,
  postAddInvestor,
} from "../../../../apis/syndicate.api";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import InvestorInfoDrawer from "../Applications/InvestorInfoDrawer";

const Invites = ({ openModal, reloadMembers }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [groupInvestors, setGroupInvestors]: any = useState([]);

  const language: any = useSelector((state: RootState) => state.language.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

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
    pending: language?.v3?.startup?.overview?.all,
    approved: language?.v3?.syndicate?.added,
  });
  const columns = [
    language?.v3?.syndicate?.investor,
    language?.v3?.syndicate?.sent_date,
    "",
  ];

  useEffect(() => {
    const firstTabKey = Object.keys(tabs)[0];
    setSelectedTab(firstTabKey);
  }, [reloadMembers]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1);
    getInvitesforGroup();
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getInvitesforGroup();
  }, [currentPage]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getInvitesforGroup();
  }, [reloadMembers]);
  const ongetInvestorInfo = async (id: any) => {
    try {
      setLoading(true);
      let { status, data } = await getApplicationInvestorInfo(authToken, id);
      if (status === 200) setInvestorInfo(data?.status?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getInvitesforGroup = async () => {
    setLoading(true);
    try {
      let { status, data } = await getInvitesSent(
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
            [language?.v3?.syndicate?.investor]:
              investor?.invitee_name || "N/A",
            [language?.v3?.syndicate?.sent_date]: investor?.sent_at,
            [""]: (
              <div
                onClick={() => {
                  ongetInvestorInfo(investor?.id);
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

  const handleRowClick = (row: any) => {
    setInvestorInfo(row);
    investorInfo && setOpen(true);
  };

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
                            getInvitesforGroup();
                          }}
                        />
                        <input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              getInvitesforGroup();
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

                      {/* <ul className="inline-flex items-center">
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
                    tableData={groupInvestors}
                    setCurrentPage={setCurrentPage}
                    paginationData={paginationData}
                    noDataNode={
                      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <div className="mb-4 font-medium  text-[#828282]">
                          {language?.v3?.syndicate?.no_group_member_yet}
                        </div>
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
export default Invites;
