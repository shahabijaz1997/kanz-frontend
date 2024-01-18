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
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import {
  getFollowedSyndicates,
  getSyndicateInfo,
} from "../../../../apis/investor.api";
import SyndicateInfoDrawer from "../SyndicateInfoDrawer";
import Search from "../../../../shared/components/Search";

const FollowingSyndicates = (): any => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const [paginationData, setpaginationData] = useState(null);
  const [filter, setFilterCounts]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const columns = [
    language?.v3?.investor?.syndicate,
    language?.v3?.investor?.total_deals,
    language?.v3?.investor?.active_deals,
    language?.v3?.investor?.raising_fund,
    language?.v3?.investor?.formation_date,
    "",
  ];
  const [loading, setLoading]: any = useState(false);
  const [invites, setInvites]: any = useState([]);
  const [syndicateInfo, setsyndicateInfo]: any = useState(null);
  const [isOpen, setOpen]: any = useState(false);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [childData, setChildData]: any = useState(null);
  const [selectedTab, setSelectedTab] = useState("all");

  const getCountvalue = (value: string) => {
    return filter[value] || 0
  };
  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    'has_active_deal': language?.v3?.investor?.has_active_deal,
    'no_active_deal': language?.v3?.investor?.no_active_deal,
  });

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

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getFollowingSynds(searchQuery);
  }, [currentPage, selectedTab]);

  const getFollowingSynds = async (queryString:string) => {
    try {
      setLoading(true);
      let { status, data } = await getFollowedSyndicates(
        authToken,
        queryString,
        currentPage,
        selectedTab
      );
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy);
        setFilterCounts(data?.status?.data?.stats)
        let syndicates = data?.status?.data?.records?.map((syndicate: any) => {
          return {
            id: syndicate?.id,
            [ language?.v3?.investor?.syndicate]: (
              <span className=" capitalize">{syndicate?.name}</span>
            ),
            [ language?.v3?.investor?.total_deals]: (
              <span className=" capitalize">{syndicate?.total_deals}</span>
            ),
            [ language?.v3?.investor?.active_deals]: (
              <span className=" capitalize">{syndicate?.active_deals}</span>
            ),
            [ language?.v3?.investor?.raising_fund]: (
              <span className=" capitalize">
                  {syndicate?.raising_fund ? (
                  <CustomStatus options={language?.v3?.fundraiser?.yes} />
                ) : (
                  <CustomStatus options={language?.v3?.fundraiser?.no} />
                )}
              </span>
            ),
            [language?.v3?.investor?.formation_date]: (
              <span className=" capitalize">{syndicate?.created_at}</span>
            ),
            [""]: (
              <div
                onClick={() => {
                  onGetSyndicateDetail(syndicate?.id);
                  setOpen(true);
                }}
                className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent mx-2"
                > <Chevrond
                className={`${orientation === "rtl" ? "rotate-[-270deg]" : "rotate-[-90deg]"} w-4 h-4`}
                strokeWidth={2}
                stroke={"#000"}
              />
              </div>
            ),
          };
        });
        setInvites(syndicates);
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
        <Search apiFunction={getFollowingSynds} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <ul className="inline-flex items-center">
                  {React.Children.toArray(
                    Object.keys(tabs).map((tab: any) => (
                      <li
                        onClick={() => {
                          setCurrentPage(1)
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
      />
    </>
  );
};
export default FollowingSyndicates;
