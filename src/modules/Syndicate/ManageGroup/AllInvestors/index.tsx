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

import { comaFormattedNumber } from "../../../../utils/object.utils";
import Table from "../../../../shared/components/Table";

import CustomStatus from "../../../../shared/components/CustomStatus";
import {
    getInvestorAllInfo,
  getNonAddedInvestors,
} from "../../../../apis/syndicate.api";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import InvestorInfoDrawer from "../Applications/InvestorInfoDrawer";
import Search from "../../../../shared/components/Search";

const AllInvestors = ({ openModal, reloadMembers }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const [loading, setLoading]: any = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [loaderParent, setloaderParent] = useState(false);
  const [isOpen, setOpen]: any = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  
  const [investors, setInvestors] = useState<any>([]);
  const [investorID, setinvestorID] = useState<any>(null);
  const [investorInfo, setInvestorInfo] = useState<any>(null);
  const [paginationData, setpaginationData] = useState(null);
  const loadingOn = () => {
    setloaderParent(!loaderParent)
  };

  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    "individual": language?.v3?.investor?.individual ,
    "firm": language?.v3?.investor?.firm
  });
  const columns = [
    language?.v3?.syndicate?.investor,
    language?.v3?.syndicate?.invested,
    language?.v3?.syndicate?.investments,
    "",
  ];
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllUserListings(searchQuery);
  }, [currentPage, selectedTab]);

  const [searchQuery, setSearchQuery]: any = useState("");
  const getCountvalue = (value: string) => {
    return filter[value] || 0
  };
  const [filter, setFilterCounts]: any = useState([]);
  const ongetInvestorInfo = async (id: any) => {
    try {
      let { status, data } = await getInvestorAllInfo(authToken, id);
      if (status === 200) setInvestorInfo(data?.status?.data);
    } catch (error) {
    } finally {

    }
  };
  const getAllUserListings = async (queryString:string) => {
    setLoading(true);
    try {
      let { status, data } = await getNonAddedInvestors(
        authToken,
        queryString,
        currentPage,
        selectedTab
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
                  setinvestorID(investor?.id)
                  setOpen(true)
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
      }
    } catch (error: any) {

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

  useEffect(()=>{
    dispatch(saveDataHolder(""));
    getAllUserListings(searchQuery)
  }, [loaderParent])



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
                <Search apiFunction={getAllUserListings} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

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
                       All Investors Invited
                      </div>
                    }
                  />
                </section>
              </React.Fragment>
            )}
          </section>
        </aside>
        <InvestorInfoDrawer
        loadingOn= {loadingOn}
          investorInfo={investorInfo}
          openDrawer={isOpen}
          isDrawerOpen={setOpen}
        />
      </main>
    </>
  );
};
export default AllInvestors;
