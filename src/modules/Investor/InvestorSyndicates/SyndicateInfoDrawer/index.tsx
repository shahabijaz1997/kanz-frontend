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
  onData,
}: any) => {
  const navigate = useNavigate();
  const sendDataToParent = () => {
    onData(true);
  };
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

  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );

  const [loading, setLoading] = useState(false);
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

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const [enableButton, setEnableButton] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnableButton(event.target.checked);
  };

  useEffect(() => {
    if (syndicateInfo !== null) {
      setButtonDisableTemp(false);
    } else {
      setButtonDisableTemp(true);
    }
  }, [syndicateInfo]);

  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false);
    }, 1000);
  };

  
  const acceptInvite = async (inviteID: any) => {
    setButtonDisableTemp(true);
    try {
      const { status } = await putAcceptInvite(
        inviteID,
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.investor?.applied, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
    }
  };
  const onFollow = async (syndId: any) => {
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
        toast.success(language?.v3?.investor?.applied, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      handleToggle();
      sendDataToParent();
    }
  };
  const handleSelectChange = (selectedOption: any) => {
    setSelectedDiscovery(selectedOption?.value);
  };

  const getButtonStatus = () => {
    if (buttonDisableTemp) return;

    return syndicateInfo?.is_invited
      ? language?.v3?.investor?.applied
      : language?.v3?.investor?.apply_to_syndicate;
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
          setButtonDisableTemp(true);
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
                  className="inline-flex items-start gap-3 justify-between cursor-pointer max-w-[70%]"
                  onClick={() => {
                    navigate(RoutesEnums.SYNDICATE_DETAILED_VIEW, {
                      state: syndicateInfo,
                    });
                  }}
                >
                  <span className="flex items-start justify-start">
                    <img
                      className="h-9 w-9 rounded-full"
                      src={syndicateInfo?.logo}
                    ></img>
                  </span>
                  <span className="w-full ml-4">
                    <span>{syndicateInfo?.name}</span>
                    <span className="flex justify-start w-full text-xs text-[#737373]">
                      {syndicateInfo?.tagline}
                    </span>
                  </span>
                </div>
                {syndicateInfo?.invite?.status === InviteStatus.INVITED && (
                  <span className="items-center">
                    <Button
                      className={`!min-w-[100px]`}
                      onClick={() => {}}
                      loading={buttonDisableTemp}
                    >
                      {language?.v3?.investor?.accept}
                    </Button>
                  </span>
                )}
                {syndicateInfo?.invite === null && (
                  <span className="items-center">
                    <Button
                      type={
                        syndicateInfo?.is_invited && !buttonDisableTemp
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
                {syndicateInfo?.invite?.invite_type === "Invite" && (
                  <span className="items-center">
                    <Button
                      centeredSpinner
                      className={`!min-w-[100px]`}
                      onClick={() => {
                        acceptInvite(syndicateInfo?.invite?.id)
                      }}
                    >
                      {"Accept"}
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
                  <div className=" pt-3 font-bold">Apply to Syndicate</div>
                  <div className="mt-5">
                    <div className=" font-medium text-sm">
                      How did you discover this syndicate?
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
                      Personal note for
                    </span>
                    <p className="text-sm text-[#737373]">
                      Briefly introduce yourself (consider adding your Linkedin
                      URL) and share why you want to invest with their
                      Syndicate.
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
                    <small className="ml-3">
                      <span className="flex items-center font-medium mt-0.5">
                        Disclaimer 1
                      </span>
                      <p className="text-sm text-[#737373]">
                        Description about desclaimer
                      </p>
                    </small>
                  </div>
                  <aside className="flex items-center justify-end mt-5">
                    <span className=" flex items-center justify-center gap-5">
                      <Button
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
                        Cancel
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
                        disabled={!enableButton}
                      >
                        {"Submit Application"}
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
                        <img
                          alt="Lead Photo"
                          className=" h-[52px] w-[52px] rounded-full"
                          src={syndicateInfo?.lead?.pic}
                        ></img>
                      </span>
                      <span className="items-center font-medium">
                        {`${syndicateInfo?.lead?.name} (Lead)`}
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
                      } deals in past ${12} months`}
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
                        {`${syndicateInfo?.portfolio_stats?.active_deals_count} active deals`}
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
                      "Any financial information provided on this website is for general informational purposes and should not be considered as financial advice. Users are encouraged to seek advice from qualified financial professionals regarding their specific financial situation and goals."
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
