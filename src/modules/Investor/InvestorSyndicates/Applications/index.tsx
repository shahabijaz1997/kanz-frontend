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
import { getAppliedSyndicates, getSyndicates } from "../../../../apis/syndicate.api";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import SyndicateInfoDrawer from "../SyndicateInfoDrawer";
import { getSyndicateInfo } from "../../../../apis/investor.api";

const Applications = ({}: any): any => {
  const [childData, setChildData]: any = useState(null);
  const [loaderParent, setLoaderParent]: any = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const loadingOn = () =>{
    setLoaderParent(!loaderParent)
  }
  const [tabs] = useState<any>({
    "all": language?.v3?.startup?.overview?.all,
    "applied": language?.v3?.investor?.applied,
    "invite_received": language?.v3?.investor?.invite_received
  });
  const columns = [
    language?.v3?.investor?.syndicate,
    language?.v3?.investor?.apply_date,
    language?.v3?.investor?.status,
    "",
  ];
  const getCountvalue = (value: string) => {
    return filter[value] || 0
  };
  const [selectedTab, setSelectedTab] = useState("all");
  const [loading, setLoading]: any = useState(false);
  const [invites, setInvites]: any = useState([]);
  const [filter, setFilterCounts]: any = useState([]);
  const [syndicateInfo, setsyndicateInfo]: any = useState(null);
  const [paginationData, setpaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen]: any = useState(false);
  const [searchQuery, setSearchQuery]: any = useState("");

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getApplications();
  }, []);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getApplications();
  }, [currentPage]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1)
    getApplications();
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getApplications();
  }, [loaderParent]);
  useEffect(() => {
    syndicateInfo?.id && onGetSyndicateDetail(syndicateInfo?.id);
    setChildData(false);
  }, [childData]);

  const onGetSyndicateDetail = async (id: any) => {
    try {
      setLoading(true);
      let { status, data } = await getSyndicateInfo(authToken, id);
      if (status === 200) setsyndicateInfo(data?.status?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getApplications = async () => {
    try {
      setLoading(true);
      let { status, data } = await getAppliedSyndicates(
        authToken,
        searchQuery,
        currentPage,
        selectedTab
      );
      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats)
        setpaginationData(data?.status?.data?.pagy);
        let deals = data?.status?.data?.records.map((syndicate: any) => {
          return {
            id: syndicate?.id,
            [language?.v3?.investor?.syndicate]: (
              <span className=" capitalize">{syndicate?.name}</span>
            ),
            [ language?.v3?.investor?.apply_date]: (
              <span className=" capitalize">{syndicate?.invite?.created_at}</span>
            ),
            [ language?.v3?.investor?.status]: (
              <span className=" capitalize">
                <CustomStatus options={syndicate?.invite?.invite_type}/>
              </span>
            ),
            [""]: (
              <div
                onClick={() => {
                  onGetSyndicateDetail(syndicate?.id);
                  setOpen(true);
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent mx-2"
              >
                 <Chevrond
                    className={`${orientation === "rtl" ? "rotate-[-270deg]" : "rotate-[-90deg]"} w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
              </div>
            ),
          };
        });
        setInvites(deals);
      }
    } catch (error: any) {
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
  return (
    <>
      <section className="inline-flex justify-between items-center w-full">
        <span className="w-full flex items-center gap-5">
          <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
            <SearchIcon
              onClick={() => {
                getApplications();
              }}
            />
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getApplications();
                }
              }}
              value={searchQuery}
              onChange={(e) => {
                setCurrentPage(1)
                setSearchQuery(e.target.value)}}
              type="search"
              className="h-full w-full outline-none pl-2 text-sm font-normal "
              placeholder={language?.v3?.common?.search}
            />
          </div>
          <ul className="inline-flex items-center">
                  {React.Children.toArray(
                    Object.keys(tabs).map((tab: any) => (
                      <li
                        onClick={() => {
                          setSelectedTab(tab)}
                        }
                        className={`py-2 px-4 font-medium text-xs cursor-pointer rounded-md transition-all ${
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
            tableData={invites}
            setCurrentPage={setCurrentPage}
            paginationData={paginationData}
            noDataNode={
              <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                {language?.v3?.investor?.no_syndicates_followed}{" "}
                <span className=" font-bold">{language?.v3?.investor?.follow_button_on_top_left}</span>{" "}
                {language?.v3?.investor?.to_follow_a_syndicate}
              </span>
            }
          />
        )}
      </section>
      <SyndicateInfoDrawer
        syndicateInfo={syndicateInfo}
        openDrawer={isOpen}
        isDrawerOpen={setOpen}
        loadingOn={loadingOn}
      />
    </>
  );
};
export default Applications;
