import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import Spinner from "../../../../shared/components/Spinner";

import Table from "../../../../shared/components/Table";

import {
  getApplicationInvestorInfo,
  getInvitesSent,
} from "../../../../apis/syndicate.api";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import InvestorInfoDrawer from "../Applications/InvestorInfoDrawer";
import Search from "../../../../shared/components/Search";

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
  const [investorInfo, setInvestorInfo] = useState<any>([]);
  const [filter, setFilterCounts]: any = useState([]);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
  const [isOpen, setOpen]: any = useState(false);


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
    dispatch(saveDataHolder(""));
    getInvitesforGroup(searchQuery);
  }, [currentPage, selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getInvitesforGroup(searchQuery);
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

  const getInvitesforGroup = async (queryString:string) => {
    setLoading(true);
    try {
      let { status, data } = await getInvitesSent(
        authToken,
        selectedTab,
        queryString,
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
                    <Search apiFunction={getInvitesforGroup} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
                          {language?.v3?.investor?.no_invites_received}
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
