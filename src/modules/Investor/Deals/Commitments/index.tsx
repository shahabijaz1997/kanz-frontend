import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../redux-toolkit/store/store";
import SearchIcon from "../../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Button from "../../../../shared/components/Button";
import Table from "../../../../shared/components/Table";
import { RoutesEnums } from "../../../../enums/routes.enum";
import { saveDataHolder } from "../../../../redux-toolkit/slicer/dataHolder.slicer";
import { numberFormatter } from "../../../../utils/object.utils";
import Spinner from "../../../../shared/components/Spinner";
import Chevrond from "../../../../ts-icons/chevrond.svg";
import { getCommitedDeals } from "../../../../apis/investor.api";
import { convertStatusLanguage } from "../../../../utils/string.utils";
import Search from "../../../../shared/components/Search";
import CustomStatus from "../../../../shared/components/CustomStatus";

const Commitments = ({}: any): any => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const columns = [
    language?.v3?.investor?.syndicate,
    language?.v3?.syndicate?.deals?.table?.title,
    language?.v3?.syndicate?.deals?.table?.category,
    language?.v3?.investor?.status,
    language?.v3?.investor?.committed,
    language?.v3?.syndicate?.deals?.table?.target,
    "",
  ];
  const [loading, setLoading]: any = useState(false);
  const [invitees, setInvitees] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery]: any = useState("");
  const [filter, setFilterCounts]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
  const [tabs] = useState<any>({
    'all': language?.v3?.startup?.overview?.all,
    'startup': language?.v3?.fundraiser?.startup,
    'property': language?.v3?.fundraiser?.property,
  });

  const getCountvalue = ( value:string ) =>
  { 
    return filter[value] || 0
  }
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllInvitees(searchQuery);
  }, [currentPage, selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    setCurrentPage(1);
    getAllInvitees(searchQuery);
  }, [selectedTab]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllInvitees(searchQuery);
  }, [currentPage]);

  const getAllInvitees = async (queryString:string) => {
    try {
      setLoading(true);
      let { status, data } = await getCommitedDeals(
        authToken,
        selectedTab,
        queryString,
        currentPage
      );
      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats);
        setpaginationData(data?.status?.data?.pagy);

        let invitees = data?.status?.data?.deals?.map((invitee: any) => {
          return {
            id: invitee?.id,
            filterStatus: invitee?.status,
            [language?.v3?.investor?.syndicate]: (
              <span className=" capitalize">{invitee?.syndicate?.name}</span>
            ),
            [language?.v3?.syndicate?.deals?.table?.title]:
              invitee?.title || language?.v3?.common?.not_added,
            [language?.v3?.syndicate?.deals?.table?.category]: (
              <span className="capitalize">{invitee?.deal_type}</span>
            ),
            [language?.v3?.syndicate?.deals?.table?.end_date]:
              invitee?.end_at || language?.v3?.common?.not_added,
            [    language?.v3?.investor?.committed
            ]: invitee?.invested_amount,
            [language?.v3?.syndicate?.deals?.table
              ?.target]: event === "ar" ?  `${numberFormatter(
                Number(invitee?.target),
                convertStatusLanguage(invitee?.deal_type)
              , true)}`:`${numberFormatter(
                Number(invitee?.target),
                convertStatusLanguage(invitee?.deal_type)
              ,false)}`,
             [language?.v3?.investor?.status]: <CustomStatus options={invitee?.status} />,

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
                className="bg-neutral-100 inline-flex items-center justify-center w-[24px] h-[24px] rounded-full transition-all hover:bg-cbc-transparent mx-5"
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
        setInvitees(invitees);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 302) {
        /*    toast.dismiss()
            toast.error("Session time out",toastUtil)
            dispatch(saveToken("")); */
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="inline-flex justify-between items-center w-full">
        <span className="w-full flex items-center gap-5">
        <Search apiFunction={getAllInvitees} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <ul className="inline-flex items-center">
            {React.Children.toArray(
              Object.keys(tabs).map((tab: any) => (
                <li
                  onClick={() => setSelectedTab(tab)}
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
            tableData={invitees}
            setCurrentPage={setCurrentPage}
            paginationData={paginationData}
            noDataNode={
              <div className="min-h-[300px]">
                  <div className="absolute left-1/2 top-1/2 translate-x-[-50%] py-24 translate-y-[-50%]">
              <p className="font-medium text-center text-lg text-[#828282]">
                {language?.v3?.investor?.follow_syndicates_to_get_invites}
              </p>
              <p className=" font-normal mt-1 text-sm  text-[#828282]">
                {language?.v3?.investor?.you_can_see_invitees_here_from_the_following_syndicate}
              </p>
              <Button
                onClick={() => navigate(`${RoutesEnums.INVESTOR_SYNDICATES}`)}
                className="mt-4"
                type="primary"
              >
              {language?.v3?.investor?.find_syndicates_to_follow}
              </Button>
            </div></div>
          
            }
          />
        )}
      </section>
    </>
  );
};
export default Commitments;
