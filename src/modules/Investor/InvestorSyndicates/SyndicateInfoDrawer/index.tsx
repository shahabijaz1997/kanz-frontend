import React, { useEffect, useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import Button from "../../../../shared/components/Button";
import Spinner from "../../../../shared/components/Spinner";
import {
  postFollowSyndicate,
  postunFollowSyndicate,
} from "../../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import SyndicateMonthlyDealsGraph from "./SyndicateMonthlyDealsGraph";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../../enums/routes.enum";
import Modal from "../../../../shared/components/Modal";
import CrossIcon from "../../../../ts-icons/crossIcon.svg";

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
  useEffect(()=>{
  
  },[])
  const user: any = useSelector((state: RootState) => state.user.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [modalAddMessage, setmodalAddMessage]: any = useState(null);
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
  const topics = [
    "Artificial Intelligence",
    "Saas",
    "Green Technology",
    "Insurance",
    "Insurance",
    "Insurance",
    "Insurance",
    "Insurance",
  ];

  let text = "AlphaTech Solutions is a leading IT company specializing in innovative software solutions and cutting-edge technologies. Our team of experts is dedicated to providing high-quality services to clients worldwide, helping them achieve their business goals through advanced digital solutions."
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
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

  const onFollow = async (syndId: any) => {
    setButtonDisableTemp(true);
    try {
      setLoading(true);
      const { status } = await postFollowSyndicate(
      { 
          invite: { message: changes.comment, invitee_id: syndId }
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
      setLoading(false);
      sendDataToParent();
    }
  };
 /*  const onunFollow = async (syndId: any, memberId: any) => {
    setButtonDisableTemp(true);
    try {
      setLoading(true);
      const { status } = await postunFollowSyndicate(
        syndId,
        memberId,
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.investor?.syndicate_unfollowed,  toastUtil); 
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      setLoading(false);
      sendDataToParent();
    }
  };
 */
  const getButtonStatus = () => {
    if (buttonDisableTemp) return;

    return syndicateInfo?.is_invited
      ? language?.v3?.investor?.applied
      : language?.v3?.investor?.apply_to_syndicate;
  };

  const displayText = showFullText ? text : text.slice(0, 500);
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
                <div className="inline-flex items-center cursor-pointer"
                onClick={ () =>{
                  navigate(RoutesEnums.SYNDICATE_DETAILED_VIEW, { state: syndicateInfo});
                }
                }>
                  <span>
                    <img
                      className=" h-9 w-9 mr-2.5 rounded-full"
                      src={syndicateInfo?.profile?.logo}
                    ></img>
                  </span>
                  <span className="items-center justify-start flex-col flex"><span>
                  {syndicateInfo?.name}
                  </span>
                  <span className="flex items-center justify-start w-full text-xs text-[#737373]">{syndicateInfo?.profile?.tagline}</span>
                  </span>
                  <></>
                </div>
                <span className="items-center">
                  <Button
                    type={
                      syndicateInfo?.is_invited && !buttonDisableTemp
                        ? "outlined"
                        : "primary"
                    }
                    centeredSpinner
                    className="!min-w-[90px]"
                    onClick={() => {
                     if (!syndicateInfo?.is_invited) setmodalAddMessage(true) 
                     else return
                    }}
                    loading={buttonDisableTemp}
                  >
                    {getButtonStatus()}
                  </Button>
                </span>
              </section>
            </header>
            <section className="items-center w-full">
              <aside className="flex items-center justify-start">
                <div className="flex flex-wrap gap-2">
                  {syndicateInfo?.profile?.industries?.map((topic:any, index:any) => (
                    <div
                      key={index}
                      className=" bg-[#F2F2F2] p-2 text-xs text-[#202223] rounded-lg"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </aside>
              <aside className="mt-4">
                <div className=" pr-2 flex items-center">
                  <span className="font-bold mb-2">
                    {language?.v3?.investor?.about}
                  </span>
                </div>
                <div className="fading-text-container text-sm">
                  <p className={showFullText ? "" : "masked"}>{displayText}</p>
                  {text.length > 800 && (
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
              <aside>
                <div className="flex-col items-center justify-end mt-4">
                  <span className="font-bold">{language?.v3?.fundraiser?.team}</span>
                  <div className="border-[1px] flex justify-center border-[#E4E7EC] w-1/2 rounded-lg shadow-md mt-3">
                    <div className="flex-col items-center p-4 justify-center">
                      <span className="flex items-center justify-center">
                        <img
                          className=" h-[52px] w-[52px] rounded-full"
                          src={"https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        ></img>
                      </span>
                      <span className="items-center font-medium">
                        {"Leonard Krasner (Lead)"}
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
                      {`${34} deals in past ${12} months`}
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
                        {"1 active deals"}
                      </span>
                    </div>
                    <div className="mt-0.5 font-medium text-sm text-[#737373]">
                      {language?.v3?.fundraiser?.active_deals}
                    </div>
                  </div>
                </aside>
                <aside className="flex justify-between items-center text-sm px-2 mt-4">
                  <div className="w-6/12 mt-1">
                 <SyndicateMonthlyDealsGraph/>
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
                      {"$162.1K" || "N/A"}
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
                  <p className="text-xs">{text.slice(0, 600)}</p>
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
                    placeholder= {language?.v3?.investor?.add_message}
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
                    setmodalAddMessage(false)
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
