import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";
import Header from "../../../shared/components/Header";
import Sidebar from "../../../shared/components/Sidebar";
import { RootState } from "../../../redux-toolkit/store/store";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import Table from "../../../shared/components/Table";
import { RoutesEnums, StartupRoutes } from "../../../enums/routes.enum";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getDeals, getInvitedDeals } from "../../../apis/deal.api";
import {
  comaFormattedNumber,
  numberFormatter,
} from "../../../utils/object.utils";
import Spinner from "../../../shared/components/Spinner";
import { ApplicationStatus } from "../../../enums/types.enum";
import Chevrond from "../../../ts-icons/chevrond.svg";
import CustomStatus from "../../../shared/components/CustomStatus";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const DealActivity = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const columns = [
    language?.v3?.syndicate?.deals?.table?.title,
    language?.v3?.syndicate?.deals?.table?.category,
    "Invite Status",
    language?.v3?.syndicate?.deals?.table?.end_date,
    language?.v3?.syndicate?.deals?.table?.target,
  ];
  const [pagination, setPagination] = useState({
    items_per_page: 10,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(false);

  const [deals, setDeals] = useState([]);
 
 
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvitedDeals(user.id, authToken, "all");
      if (status === 200) {
        let deals = data?.status?.data?.map((deal: any) => {
          return {
            id: deal?.id,
            filterStatus: deal?.status,
            [language?.v3?.syndicate?.deals?.table?.title]:
              deal?.deal?.title || "N/A",
            [language?.v3?.syndicate?.deals?.table?.category]: (
              <span className="capitalize">{deal?.deal?.type}</span>
            ),
            ["Invite Status"]:
              <CustomStatus options={deal?.status} /> || "N/A",
            [language?.v3?.syndicate?.deals?.table?.end_date]:
              deal?.deal?.end_at || " N/A",
            [language?.v3?.syndicate?.deals?.table
              ?.target]: `$${numberFormatter(Number(deal?.deal?.target))}`,

            Steps: deal?.current_state?.steps,
          };
        });

        setPagination((prev) => {
          return {
            ...prev,
            total_items: deals.length,
            current_page: 1,
            total_pages: Math.ceil(deals.length / prev.items_per_page),
            data: deals?.slice(0, prev.items_per_page),
          };
        });
        setDeals(deals);
      }
    } catch (error:any) {
      if (error.response && error.response.status === 401 || error.response.status === 400) {
        toast.dismiss()
        toast.error("Session time out",toastUtil)
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN);
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
        const data = deals.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = deals.slice(startIndex, endIndex);
        return { ...prev, current_page: prevPage, data };
      });
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = deals.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  return (
    <main className="h-full relative max-h-full">
          <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-2xl mb-2">
                    {"Deal Activity"}
                  </h1>
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
                  pagination={pagination}
                  paginate={paginate}
                  goToPage={paginate}
                  removeHref={true}
                />
              </section>
            </React.Fragment>
          )}
      
    </main>
  );
};
export default DealActivity;
