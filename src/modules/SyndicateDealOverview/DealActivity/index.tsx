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

  const columns = [
    "Name",
    "User Type",
    "Date",
    "Status",
    "Amount Raised",
    
  ];
  const [pagination, setPagination] = useState({
    items_per_page: 10,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });
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
            "Name":<span className="capitalize">{dealActivity?.investor?.name}</span> ,
            ["User Type"]:<span className="capitalize">{dealActivity?.type}</span> ,
            ["Date"]:
              dealActivity?.date|| "N/A",
             ["Status"]:
              <CustomStatus options={dealActivity?.status === "committed_amount" ? "Committed" : dealActivity?.status} /> || "N/A", 
            ["Amount Raised"]: (
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

  const paginate = (type: string) => {
    if (type === "next" && pagination.current_page < pagination.total_pages) {
      setPagination((prev: any) => {
        const nextPage = prev.current_page + 1;
        const startIndex = (nextPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = activity.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = activity.slice(startIndex, endIndex);
        return { ...prev, current_page: prevPage, data };
      });
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = activity.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  return (
    <main className="h-full relative max-h-full">
      <section className="inline-flex justify-between items-center w-full">
        <div className="w-full"> 
        {!dealCreatorView && (  <h1 className="text-black font-medium text-2xl mb-2">
            {"Deal Activity"}
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
                  No activity for now!
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
