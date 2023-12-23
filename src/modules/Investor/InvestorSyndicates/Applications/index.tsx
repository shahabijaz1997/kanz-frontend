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
import { getSyndicates } from "../../../../apis/syndicate.api";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import SyndicateInfoDrawer from "../SyndicateInfoDrawer";
import { getSyndicateInfo } from "../../../../apis/investor.api";
import SyndicateMonthlyDealsGraph from "../SyndicateInfoDrawer/SyndicateMonthlyDealsGraph";

const Applications = ({}: any): any => {
  const [childData, setChildData]: any = useState(null);

  const handleChildData = (data: any) => {
    setChildData(data);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
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
  const [paginationData, setpaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen]: any = useState(false);
  const [searchQuery, setSearchQuery]: any = useState("");

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllSyndicates();
  }, []);
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
  const getAllSyndicates = async () => {
    try {
      setLoading(true);
      let { status, data } = await getSyndicates(
        authToken,
        searchQuery,
        currentPage
      );
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy);
        let deals = data?.status?.data?.records.map((syndicate: any) => {
          return {
            id: syndicate?.id,
            [language?.v3?.investor?.syndicate]: (
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
                  <CustomStatus options={"Yes"} />
                ) : (
                  <CustomStatus options={"No"} />
                )}
              </span>
            ),
            [ language?.v3?.investor?.formation_date]: (
              <span className=" capitalize">{syndicate?.created_at}</span>
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
    <div className="p-6">
        <SyndicateMonthlyDealsGraph/>
        </div>


     
  );
};
export default Applications;
