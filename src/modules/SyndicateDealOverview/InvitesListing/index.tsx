import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { postInviteSyn } from "../../../apis/deal.api";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import { KanzRoles } from "../../../enums/roles.enum";
import { toastUtil } from "../../../utils/toast.utils";
import { toast } from "react-toastify";
import { ApplicationStatus } from "../../../enums/types.enum";
import Spinner from "../../../shared/components/Spinner";
import DropDownShareDeal from "../../../ts-icons/DropDownShareDeal.svg";
import { getAllInvestors } from "../../../apis/investor.api";
import SharewithGroupIcon from "../../../ts-icons/SharewithGroupIcon.svg";
import CopyInviteLinkIcon from "../../../ts-icons/CopyInviteLinkIcon.svg";
import { numberFormatter } from "../../../utils/object.utils";


const InvitesListing = ({  dealId, type, dealIdReal }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref: any = useRef();

  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const [loading, setLoading] = useState<boolean>(false);
  const [investors, setInvestors] = useState<any>([]);
  const [showInvestors, setShowInvestors] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowInvestors(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  useEffect (()=>{
    console.log(dealId)
  },[])

  const copyToClipboard = () => {
    let finalstring =
      RoutesEnums.FRONTEND_STATIC_LINK +
      RoutesEnums.SYNDICATE_DEAL_DETAIL +
      `/${dealId}`;
    const clipboard = navigator.clipboard;
    clipboard.writeText(finalstring);
    toast.success(`${language?.v3?.button?.copy_link_success}`, toastUtil);
  };

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllUserListings();
  }, [type]);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    console.log(investors);
  }, [investors]);


  


  const onSendInvite = async (syndId: any) => {
    try {
      const { status } = await postInviteSyn(
        {
          message: "You have been invited",
          invitee_id: syndId,
        },
        dealIdReal,
        authToken
      );
      if (status === 200) {
        toast.success("Investor Invited", toastUtil);
        let elem: any = document.getElementById(`synd-${syndId}`);
        let button = document.createElement("button");
        button.innerText = "Invited";
        elem.innerHTML = "";
        elem.appendChild(button);
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
    }
  };



  const inviteAllGroup = async (syndId: any) => {
    try {
      const { status } = await postInviteSyn(
        {
          message: "You have been invited",
          invitee_id: syndId,
        },
        dealIdReal,
        authToken
      );
      if (status === 200) {
        toast.success("Investor Invited", toastUtil);
        let elem: any = document.getElementById(`synd-${syndId}`);
        let button = document.createElement("button");
        button.innerText = "Invited";
        elem.innerHTML = "";
        elem.appendChild(button);
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
    }
  };

  

  const getAllUserListings = async () => {
    try {
      setLoading(true);
      let results: any;
      if (type === KanzRoles.SYNDICATE)
        results = await getAllInvestors(authToken);
      let { status, data } = results;
      if (status === 200) {
        let syndicatesData = data?.status?.data || [];
        let investors:any = syndicatesData.map((investor: any) => ({
          id: investor?.id,
          member_name: <span className=" capitalize">{investor?.member_name}</span>,
          /* handle: investor?.handle || "N/A", */
          profileImage: investor?.image,
          action: (
            <span id={`synd-${investor?.id}`}>
              <Button
                divStyle="items-center justify-end max-w-fit"
                type="outlined"
                className="!p-3 !py-1 !rounded-full"
                onClick={() => onSendInvite(investor?.id)}
              >
                Share
              </Button>
            </span>
          ),
        }));

        setInvestors(investors);
      }
    } catch (error: any) {
      console.log(error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.status === 400
      ) {
        toast.dismiss();
        toast.warn("Already Invited", toastUtil);
      }
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref}>

            <Button
                onClick={() => {
                    getAllUserListings();
                    setShowInvestors(true);
            }}
                className="w-full  px-5"
            >
                <span className="mr-2 font-light">Share Deal</span> <DropDownShareDeal/>
            </Button> 
      {showInvestors ? (
        <section className="absolute p-5 mt-2 shadow-2xl bg-white border-[1px] border-neutral-300 rounded-md w-[400px] right-0 top-[100%]">
          <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden w-full inline-flex items-center px-2">
            <SearchIcon />
            <input
              type="search"
              className="h-full w-full outline-none pl-2 pr-[6.5rem] text-sm font-normal text-gray-400"
              placeholder={language?.v3?.common?.search}
            />
          </div>

          {loading ? (
            <div
              className="absolute left-0 top-0 w-full h-full grid place-items-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
            >
              <Spinner />
            </div>
            
          ) : (
            investors.length > 0 ? (  React.Children.toArray(
                investors.map((investor: any) => (
                  <div className="py-3 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center">
                    <div className=" justify-between items-center w-full">
                    <p>{investor.member_name}</p>
                    <div className="font-sm text-xs font-light">{numberFormatter(investor.invested_amount)} invested in {numberFormatter(investor.no_investments)} investments</div>
                    </div>
                    {investor.action}
                  </div>
                ))
              )):
              (
                <div className="flex flex-col items-center justify-start mt-8 space-y-4">
                    All investors invited
                </div>
              )
          
          )}
          <span className="inline-flex justify-between w-full mt-2">
            <Button
              type="outlined"
              onClick={() => {
                inviteAllGroup(user.id);
              }}
              className="w-full mx-1 px-[15px]"
            >
                <span className="mr-3">
                    <SharewithGroupIcon/>
                </span>
              {"Share with group"}
            </Button>
            <Button
              type="outlined"
              onClick={() => {
                copyToClipboard();
              }}
              className="w-full mx-1  px-[15px]"
            >
                <span className="mr-3">
                    <CopyInviteLinkIcon/>
                </span>
              {"Copy Invite Link"}
            </Button>
          </span>
        </section>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </div>
  );
};
export default InvitesListing;
