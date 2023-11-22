import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../shared/components/Table";
import { RootState } from "../../../redux-toolkit/store/store";
import { ApplicationStatus } from "../../../enums/types.enum";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getDealSyndicates } from "../../../apis/deal.api";
import Button from "../../../shared/components/Button";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import CustomStatus from "../../../shared/components/CustomStatus";
import { numberFormatter } from "../../../utils/object.utils";
import Spinner from "../../../shared/components/Spinner";

const InvitedSyndicates = ({ id, setInnerLoader }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const columns = [
    "Syndicate",
    "Status",
    "Invitation Sent On",
    "Invite Expiration Date",
  ];
  const [loading, setLoading]: any = useState(false);
  const [invites, setInvites]: any = useState([]);
  const [pagination, setPagination] = useState({
    items_per_page: 5,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);
 

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealSyndicates(id, authToken);
      if (status === 200) {
        let deals = data?.status?.data
          ?.filter((deal: any) => deal?.status === "pending")
          ?.map((deal: any) => {
            return {
              id: deal?.id,
              ["Syndicate"]: (
                <span className=" capitalize">{deal?.invitee?.name}</span>
              ),
              ["Status"]: (
                <span className="capitalize">
                  {" "}
                  <CustomStatus options={deal?.status} />
                </span>
              ),
              ["Invitation Sent On"]: deal?.sent_at,
              ["Invite Expiration Date"]: deal?.invite_expiry || "N/A",
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
        setInvites(deals);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
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
        const data = invites.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = invites.slice(startIndex, endIndex);

        return { ...prev, current_page: prevPage, data };
      });
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = invites.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  return (
    <section className="mt-10 relative">
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
          pagination={pagination}
          paginate={paginate}
          goToPage={paginate}
          noDataNode={
            <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
              No invites sent! Click on the{" "}
              <span className=" font-bold">invite button on top right</span> to
              invite a syndicate
            </span>
          }
        />
      )}
    </section>
  );
};
export default InvitedSyndicates;
