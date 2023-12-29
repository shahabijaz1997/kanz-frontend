import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import React, { useEffect, useState } from "react";
import Table from "../../../shared/components/Table";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import {
  comaFormattedNumber,
} from "../../../utils/object.utils";
import Spinner from "../../../shared/components/Spinner";
import { getDealActivity } from "../../../apis/syndicate.api";
import CustomStatus from "../../../shared/components/CustomStatus";

const DealActivity = ({dealID, dealCreatorView}: any) => {
  const dispatch = useDispatch();
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const language: any = useSelector((state: RootState) => state.language.value);


  const columns = [
    language?.v3?.fundraiser?.name,
    language?.v3?.fundraiser?.user_type,
    language?.v3?.fundraiser?.date,
    language?.v3?.fundraiser?.status,
    language?.v3?.fundraiser?.amount_raised,
    
  ];
  const [loading, setLoading] = useState(false);
  const [activity, setDeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);
 
  useEffect(() => {
    dispatch(saveDataHolder(""));
    dealID && getAllDeals();
  }, []);
  useEffect(() => {
    dispatch(saveDataHolder(""));
     getAllDeals();
  }, [currentPage]);

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealActivity(dealID, authToken, currentPage);
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy)
        let activity = data?.status?.data?.records?.map((dealActivity: any) => {
          return {
            id: dealActivity?.investor?.id,
            [ language?.v3?.fundraiser?.name]:<span className="capitalize">{dealActivity?.investor?.name}</span> ,
            [language?.v3?.fundraiser?.user_type]:<span className="capitalize">{dealActivity?.type}</span> ,
            [language?.v3?.fundraiser?.date]:
              dealActivity?.date|| language?.v3?.common?.not_added,
             [language?.v3?.fundraiser?.status]:
              <CustomStatus options={dealActivity?.status === "committed_amount" ? "Committed" : dealActivity?.status} /> ||language?.v3?.common?.not_added, 
            [language?.v3?.fundraiser?.amount_raised]: (
              <span>{comaFormattedNumber(dealActivity?.amount)}</span>
            ),
          };
        });
        setDeals(activity);
      }
    } catch (error:any) {
      if (error.response && error.response.status === 302) {
     /*    toast.dismiss()
        toast.error("Session time out",toastUtil)
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN); */
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full relative max-h-full">
      <section className="inline-flex justify-between items-center w-full">
        <div className="w-full"> 
        {!dealCreatorView && (  <h1 className="text-black font-medium text-2xl mb-2">
            {language?.v3?.investor?.deal_activity}
          </h1>) }
        </div>
      </section>
      {loading ? (
        <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <section className="mt-5 shadow-lg">
            <Table
              columns={columns}
              tableData={activity}
              setCurrentPage={setCurrentPage}
              paginationData={paginationData}
              removeHref={true}
              noDataNode={
                <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  {language?.v3?.fundraiser?.no_activity_for_now}
                </span>
              }
            />
          </section>
        </React.Fragment>
      )}
    </main>
  );
};
export default DealActivity;
