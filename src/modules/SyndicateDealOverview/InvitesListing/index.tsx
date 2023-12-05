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
import Spinner from "../../../shared/components/Spinner";
import DropDownShareDeal from "../../../ts-icons/DropDownShareDeal.svg";
import { getAllInvestors, sharewithGroup } from "../../../apis/syndicate.api";
import SharewithGroupIcon from "../../../ts-icons/SharewithGroupIcon.svg";
import CopyInviteLinkIcon from "../../../ts-icons/CopyInviteLinkIcon.svg";
import { numberFormatter } from "../../../utils/object.utils";

const InvitesListing = ({ dealId, type, dealIdReal}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref: any = useRef();

  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const [loading, setLoading] = useState<boolean>(false);
  const [investors, setInvestors] = useState<any>([]);
  const [showInvestors, setShowInvestors] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowInvestors(false);
        setSearchText("");
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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


  const onShareDeal = async (investorID: any) => {
    try {
      const { status } = await postInviteSyn(
        {
          message: "You have been invited",
          invitee_id: investorID,
        },
        dealIdReal,
        authToken
      );
      if (status === 200) {
        toast.success("Investor Invited", toastUtil);
        const dataCopy = [...investors]
        const index = dataCopy.findIndex(item => item.id === investorID);
        dataCopy[index].status = true
        setInvestors(dataCopy)
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
    }
  };

  const inviteAllGroup = async () => {
    try {
      const { status } = await sharewithGroup(dealIdReal, authToken);
      if (status === 200) {
        toast.success("Invitation sent", toastUtil);
        let elem: any = document.getElementById(`group`);
        let button = document.createElement("button");
        button.innerText = "Group Invited";
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
        results = await getAllInvestors(dealIdReal, authToken);
      let { status, data } = results;
      if (status === 200) {
        let syndicatesData = data?.status?.data || [];
        let investors: any = syndicatesData.map((investor: any) => ({
          id: investor?.id,
          member_name: <span className=" capitalize">{investor?.name}</span>,
          profileImage: investor?.image,
          investedAmount:investor?.invested_amount,
          noOfinvestments: investor?.no_investments,
          status:investor?.already_invited
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
        <span className="mr-2 font-light">Share Deal</span>{" "}
        <DropDownShareDeal />
      </Button>
      {showInvestors ? (
        <section className="absolute p-5 mt-2 shadow-2xl bg-white border-[1px] border-neutral-300 rounded-md w-[400px] right-0 top-[100%]">
          <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden w-full inline-flex items-center px-2">
            <SearchIcon />
            <input
             onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getAllUserListings();
              }
            }}
              type="search"
              className="h-full w-full outline-none pl-2  text-sm font-normal"
              placeholder={"Search for Investors"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
            <div className="max-h-[250px] overflow-auto custom-scroll px-2">
              {investors.length > 0 ? (
                React.Children.toArray(
                  investors
                    .filter((investor: any) =>
                      JSON.stringify(investor.member_name?.props?.children)
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((investor: any) => (
                      <div className="py-3 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center">
                        <div className=" justify-between items-center w-full">
                          <p>{investor.member_name}</p>
                          <div className="font-sm text-xs font-light">
                            {investor?.investedAmount == 0.0 ? "0": numberFormatter(investor?.investedAmount)}{" "}
                            invested in{" "}
                            {numberFormatter(investor?.noOfinvestments)}{" "}
                            investments
                          </div>
                        </div>
                  {investor?.status ?  <Button
                divStyle="items-center justify-end max-w-fit"
                type="outlined"
                className="!p-2 !text-black !py-1 !rounded-full !border-black"
              >
                Shared
              </Button>  : 
              <Button
              divStyle="items-center justify-end max-w-fit"
              type="outlined"
              className="!p-3 !py-1 !rounded-full"
              onClick={() => onShareDeal(investor?.id )}
            >
              Share
            </Button> }
                      </div>
                    ))
                )
              ) : (
                <div className="flex flex-col items-center justify-start mt-8 space-y-4">
                  All investors invited
                </div>
              )}
            </div>
          )}
          <span
            id={`group-${user.id}`}
            className="inline-flex justify-between w-full mt-2"
          >
            <Button
              type="outlined"
              onClick={() => {
                inviteAllGroup();
              }}
              className="w-full mx-1 px-[15px]"
            >
              <span className="mr-3">
                <SharewithGroupIcon />
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
                <CopyInviteLinkIcon />
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
