import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../shared/components/Table";
import { RootState } from "../../../redux-toolkit/store/store";
import { ApplicationStatus } from "../../../enums/types.enum";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getInvitedDealSyndicates } from "../../../apis/deal.api";
import Button from "../../../shared/components/Button";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import CustomStatus from "../../../shared/components/CustomStatus";
import { numberFormatter } from "../../../utils/object.utils";
import Spinner from "../../../shared/components/Spinner";

const InvitedSyndicates = ({ id }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const columns = [
    language?.v3?.fundraiser?.syndicate,
    language?.v3?.fundraiser?.status,
    language?.v3?.fundraiser?.invitation_sent_on,
    language?.v3?.fundraiser?.invite_expiration_date,
  ];
  const [loading, setLoading]: any = useState(false);
  const [invites, setInvites]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setpaginationData] = useState(null);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, []);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, [currentPage]);
 

  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getInvitedDealSyndicates(id, authToken, currentPage);
      if (status === 200) {
        setpaginationData(data?.status?.data?.pagy)
        let deals = data?.status?.data?.invites
          ?.map((deal: any) => {
            return {
              id: deal?.id,
              [ language?.v3?.fundraiser?.syndicate]: (
                <span className=" capitalize">{deal?.invitee?.name}</span>
              ),
              [language?.v3?.fundraiser?.status]: (
                <span className="capitalize">
                  {" "}
                  <CustomStatus options={deal?.status} />
                </span>
              ),
              [language?.v3?.fundraiser?.invitation_sent_on]: deal?.sent_at,
              [language?.v3?.fundraiser?.invite_expiration_date]: deal?.invite_expiry || "N/A",
            };
          });
        setInvites(deals);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.FUNDRAISER_DASHBOARD });
      }
    } finally {
      setLoading(false);
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
          tableData={invites}
          setCurrentPage={setCurrentPage}
          paginationData={paginationData}
          noDataNode={
            <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
              {language?.v3?.fundraiser?.no_invites_sent}{" "}
              <span className=" font-bold">{language?.v3?.fundraiser?.invite_button_on_top_right}</span> to
              {language?.v3?.fundraiser?.to_invite_a_syndicate}
            </span>
          }
        />
      )}
    </section>
  );
};
export default InvitedSyndicates;
