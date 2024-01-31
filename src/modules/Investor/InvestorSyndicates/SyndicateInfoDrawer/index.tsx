import React, { useEffect, useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import Button from "../../../../shared/components/Button";
import Spinner from "../../../../shared/components/Spinner";
import { postFollowSyndicate } from "../../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import SyndicateMonthlyDealsGraph from "./SyndicateMonthlyDealsGraph";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../../enums/routes.enum";
import Modal from "../../../../shared/components/Modal";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";
import Selector from "../../../../shared/components/Selector";
import { comaFormattedNumber } from "../../../../utils/object.utils";
import { DealCheckType, InviteStatus } from "../../../../enums/types.enum";
import { putAcceptInvite } from "../../../../apis/syndicate.api";

const SyndicateInfoDrawer = ({
  syndicateInfo,
  openDrawer,
  isDrawerOpen,
  loadingOn,
}: any) => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const user: any = useSelector((state: RootState) => state.user.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [modalAddMessage, setmodalAddMessage]: any = useState(null);
  const [selectedDiscovery, setSelectedDiscovery]: any = useState(null);
  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });
  useEffect(()=>{
    setLoading(false)
 }, [syndicateInfo])
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const [loading, setLoading] = useState(true);
  const [buttonDisableTemp, setButtonDisableTemp] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const options = [
    { label: "News", value: "news" },
    { label: "Social Media", value: "social_media" },
    { label: "Website", value: "website" },
    { label: "Other", value: "other" },
  ];

  
  useEffect(()=>{
    setLoading(false)
    setHideButton(false)
 }, [syndicateInfo])

  const [showFullText, setShowFullText] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const [enableButton, setEnableButton] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableButton(event.target.checked);
  };


  useEffect(() => setLoading(openDrawer), [openDrawer])

  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false);
    }, 1000);
  };

  const getAcceptButtonStatus = () => {
    if(hideButton) return language?.v3?.investor?.accepted
    else return language?.v3?.investor?.accept
  };

  
  const acceptInvite = async (inviteID: any) => {
    setHideButton(true)
    setButtonDisableTemp(true);
    try {
      const { status } = await putAcceptInvite(
        inviteID,
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.investor?.invite_accepted, toastUtil);
      isDrawerOpen(false)
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      loadingOn()
    }
  };
  const onFollow = async (syndId: any) => {
    setHideButton(true)
    setButtonDisableTemp(true);
    try {
      const { status } = await postFollowSyndicate(
        {
          invite: {
            discovery_method: selectedDiscovery,
            message: changes.comment,
            invitee_id: syndId,
          },
        },
        syndId,
        authToken
      );
      if (status === 200) {
        isDrawerOpen(false)
        toast.success(language?.v3?.investor?.applied, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      handleToggle();
      loadingOn()
    }
  };
  const handleSelectChange = (selectedOption: any) => {
    setSelectedDiscovery(selectedOption?.value);
  };

  const getButtonStatus = () => {
    if(hideButton) return language?.v3?.investor?.applied
    else return language?.v3?.investor?.apply_to_syndicate
  };
  const displayText = showFullText
    ? syndicateInfo?.about
    : syndicateInfo?.about?.slice(0, 500);
  const abbreviatedMonths = syndicateInfo?.portfolio_stats?.labels.map(
    (month: string) => month.charAt(0)
  );

  return (
    <main>
      <Drawer
        drawerWidth="w-[600px]"
        isOpen={openDrawer}
        setIsOpen={(val: boolean) => {
          setLoading(true)
          setHideButton(false)
          setIsExpanded(false)
          setEnableButton(false)
          isDrawerOpen(val);
        }}
      >
        {loading ? (
          <aside className="relative h-full">
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          </aside>
        ) : (
          <div className="z-[103px] custom-scroll">
            <header className="text-lg pr-3 pt-3 pb-2 items-center  w-full sticky">
              <section className="pb-10 w-full items-center capitalize justify-between flex">
                <div
                  className="inline-flex items-center gap-3 justify-between cursor-pointer max-w-[70%] hover:text-blue-500 hover:underline"
                  onClick={() => {
                    navigate(RoutesEnums.SYNDICATE_DETAILED_VIEW, {
                      state: syndicateInfo,
                    });
                  }}
                >
                  {syndicateInfo?.profile_picture_url ? (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={syndicateInfo?.profile_picture_url}
                        alt="Profile Pic"
                      />
                    ) : (
                      <div className="h-12 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                        {syndicateInfo?.name?.substring(0, 2)}
                      </div>
                    )}
                  <span className="w-full flex-col items-start justify-center flex h-full">
                    <span>{syndicateInfo?.name}</span>
                    <span className="flex justify-start w-full text-xs text-[#737373]">
                      {syndicateInfo?.tagline}
                    </span>
                  </span>
                </div>
                {syndicateInfo?.invite === null && (
                  <span className="items-center">
                    <Button
                    disabled={hideButton}
                      type={
                        hideButton
                          ? "outlined"
                          : "primary"
                      }
                      centeredSpinner
                      className={`!min-w-[100px] ${
                        syndicateInfo?.is_invited &&
                        `!cursor-not-allowed 'hover:border-none`
                      }`}
                      onClick={() => {
                        if (syndicateInfo?.is_invited) {
                          return;
                        } else {
                          handleToggle();
                        }
                      }}
                    >
                      {getButtonStatus()}
                    </Button>
                  </span>
                )}
                {syndicateInfo?.invite?.invite_type === "Invite Received" && syndicateInfo?.invite?.status === "pending" && (
                  <span className="items-center">
                    <Button
                       type={
                        hideButton
                          ? "outlined"
                          : "primary"
                      }
                    disabled={hideButton}
                      centeredSpinner
                      className={`!min-w-[100px]`}
                      onClick={() => {
                        acceptInvite(syndicateInfo?.invite?.id)
                      }}
                    >
                      {getAcceptButtonStatus()}
                    </Button>
                  </span>
                )}
              </section>
            </header>
            <section className="items-center w-full">
              <aside className="flex items-center justify-start">
                <div className="flex flex-wrap gap-2">
                  {syndicateInfo?.industries?.map((topic: any, index: any) => (
                    <div
                      key={index}
                      className=" bg-[#F2F2F2] p-2 text-xs text-[#202223] rounded-lg"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </aside>
              <section
                className={`your-container overflow-hidden bg-[#F2F2F2] rounded-md mt-3 ${
                  isExpanded ? "expanded" : ""
                }`}
              >
                <aside className="p-5">
                  <div className=" pt-3 font-bold">{language?.v3?.investor?.apply_to_syndicate}</div>
                  <div className="mt-5">
                    <div className=" font-medium text-sm">
                    {language?.v3?.investor?.how_did_you_discover_this_syndicate}
                    </div>
                    <div className="mt-1">
                      <Selector
                        options={options}
                        isSearchable={true}
                        placeholder=""
                        onChange={handleSelectChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <span className="mt-5 font-medium text-sm">
                    {language?.v3?.investor?.personal_note_for}

                    </span>
                    <p className="text-sm text-[#737373]">
                    {language?.v3?.investor?.briefly_introduce_yourself}
                    </p>
                    <textarea
                      value={changes?.comment}
                      onChange={(e) =>
                        setChanges((prev: any) => {
                          return { ...prev, comment: e.target.value };
                        })
                      }
                      className="w-full mt-1 border-[1px] border-[#D4D4D4] min-h-[110px] p-1.5 text-sm"
                    ></textarea>
                  </div>
                  <div className="mt-5 flex">
                    <input
                      type="checkbox"
                      className="accent-cyan-800 h-3 w-3 mt-1.5 cursor-pointer"
                      onChange={handleCheckboxChange}
                    />
                    <small className="mx-3">
                      <span className="flex items-center font-medium mt-0.5">
                        {language?.v3?.investor?.disclaimer_1}
                      </span>
                      <p className="text-sm text-[#737373]">
                      {language?.v3?.investor?.description_about_disclaimer}
                      </p>
                    </small>
                  </div>
                  <aside className="flex items-center justify-end mt-5">
                    <span className=" flex items-center justify-center gap-5">
                      <Button
                      disabled={hideButton}
                        onClick={() => {
                          setChanges({
                            comment: "",
                            action: "",
                            document: null,
                          });
                          handleToggle();
                        }}
                        className="!w-[140px] !text-black !border-[black]"
                        type="outlined"
                      >
                        {language?.v3?.investor?.cancel}
                      </Button>
                      <Button
                        centeredSpinner
                        className=""
                        onClick={() => {
                          onFollow(syndicateInfo?.id);
                          setChanges({
                            comment: "",
                            action: "",
                            document: null,
                          });
                        }}
                        loading={buttonDisableTemp}
                        disabled={!enableButton || hideButton}
                      >
                       {language?.v3?.investor?.submit_application}
                      </Button>
                    </span>
                  </aside>
                </aside>
              </section>
              {syndicateInfo?.about && (
                <aside className="mt-4">
                  <div className=" pr-2 flex items-center">
                    <span className="font-bold mb-2">
                      {language?.v3?.investor?.about}
                    </span>
                  </div>
                  <div className="fading-text-container text-sm">
                    <p className={showFullText ? "" : "masked"}>
                      {displayText}
                    </p>
                    {syndicateInfo?.about?.length > 800 && (
                      <button
                        className=" text-xs text-neutral-500"
                        onClick={toggleText}
                      >
                        {showFullText
                          ? language?.v3?.investor?.see_less
                          : language?.v3?.investor?.see_more}
                      </button>
                    )}
                  </div>
                </aside>
              )}

              <aside>
                <div className="flex-col items-center justify-end mt-4">
                  <span className="font-bold">
                    {language?.v3?.fundraiser?.team}
                  </span>
                  <div className="border-[1px] flex justify-center border-[#E4E7EC] w-1/2 rounded-lg shadow-md mt-3">
                    <div className="flex-col items-center p-4 justify-center">
                      <span className="flex items-center justify-center">
                      {syndicateInfo?.lead?.profile_pic ? (
                          <img
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                            height: "88px",
                            width: "88px",
                          }}
                            className="w-full h-full shadow-md rounded-full flex items-center justify-center"
                            src={syndicateInfo?.lead?.profile_pic}
                          />
                        ) : (
                          <div
                          className="h-[88px] w-[88px] shadow-md rounded-md flex items-center justify-center"
                          style={{ backgroundColor: "#155E75" }}
                        >
                          <span className="text-white font-bold text-2xl ">
                          {syndicateInfo?.lead?.name.substr(0, 2)}
                          </span>
                        </div>
                        )}
                      </span>
                      <span className="items-center font-medium">
                        {`${syndicateInfo?.lead?.name} (${language?.v3?.investor?.lead})`}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
              <aside className="mt-6">
                <div className=" pr-2 flex items-center">
                  <span className="font-bold mb-4">
                    {language?.v3?.investor?.portfolio_stats}
                  </span>
                </div>
                <aside className="flex justify-between items-center text-sm px-6">
                  <div className=" w-full pl-3 pr-3 py-3">
                    <div className="font-medium text-base">
                      {`${
                        syndicateInfo?.portfolio_stats
                          ?.total_deals_closed_in_12_months
                      }${" " +language?.v3?.investor?.last_12_months}`}
                    </div>
                    <div className=" mt-0.5 font-medium text-sm text-[#737373]">
                      {language?.v3?.fundraiser?.syndicate_deals}
                    </div>
                  </div>
                  <div
                    className={`${
                      orientation === "rtl" ? "mr-16" : "ml-16"
                    }   w-full pl-3 pr-3 py-3`}
                  >
                    <div>
                      <span className="font-medium text-base">
                        {`${syndicateInfo?.portfolio_stats?.active_deals_count} ${language?.v3?.investor?.active_deals}`}
                      </span>
                    </div>
                    <div className="mt-0.5 font-medium text-sm text-[#737373]">
                      {language?.v3?.fundraiser?.active_deals}
                    </div>
                  </div>
                </aside>
                <aside className="flex justify-between items-center text-sm px-2 mt-4">
                  <div className="w-6/12 mt-1">
                    <SyndicateMonthlyDealsGraph
                      months={abbreviatedMonths}
                      values={syndicateInfo?.portfolio_stats?.values}
                    />
                  </div>
                  <div
                    className={`w-5/12 border-[1px] border-[#E4E7EC] rounded-lg shadow-md  pl-3 pr-3 mb-4 py-6`}
                  >
                    <div>
                      <span className="font-medium text-base">
                        {language?.v3?.fundraiser?.total_raised_amount}
                      </span>
                    </div>
                    <div className="mt-2 font-bold text-xl">
                      {`${comaFormattedNumber(
                        syndicateInfo?.portfolio_stats?.total_raised,
                        DealCheckType.STARTUP,
                        false
                      )}`}
                    </div>
                  </div>
                </aside>
              </aside>
              <aside className="mt-6">
                <div className=" pr-2 flex items-center">
                  <span className="font-bold ">
                    {language?.v3?.investor?.disclaimers}
                  </span>
                </div>
                <aside className="flex justify-between items-center text-sm  overflow-y-auto">
                  <p className="text-xs">
                    {
                    language.v3?.investor?.disc_drawer
                    }
                  </p>
                </aside>
              </aside>
            </section>
          </div>
        )}
      </Drawer>
      <Modal show={modalAddMessage ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[700px] rounded-md p-5 h-full">
            <header className=" h-16 py-2 px-3 inline-flex w-full justify-between items-center">
              <div
                className="bg-white h-8 w-8 border-[1px] border-black rounded-md  shadow-cs-6 p-1 cursor-pointer"
                onClick={() => {
                  setmodalAddMessage(false);
                  setChanges({ comment: "", action: "", document: null });
                }}
              >
                <CrossIcon stroke="#000" />
              </div>
            </header>
            <section className="py-3 px-3">
              <div className="mb-6">
                <label
                  htmlFor=""
                  className="text-neutral-900 font-medium text-lg"
                >
                  {language?.v3?.investor?.add_message}
                </label>
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder={language?.v3?.investor?.add_message}
                  className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3">
              <Button
                disabled={!changes.comment}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => {
                  onFollow(syndicateInfo?.id);
                  setmodalAddMessage(false);
                  setChanges({ comment: "", action: "", document: null });
                }}
              >
                {language?.v3?.fundraiser?.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
    </main>
  );
};
export default SyndicateInfoDrawer;
