import React, { useEffect, useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import Button from "../../../../shared/components/Button";
import Spinner from "../../../../shared/components/Spinner";
import { comaFormattedNumber, numberFormatter } from "../../../../utils/object.utils";
import RaiseIcon from "../../../../ts-icons/raiseIcon.svg";
import { postFollowSyndicate, postunFollowSyndicate } from "../../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import { DealCheckType } from "../../../../enums/types.enum";

const SyndicateInfoDrawer = ({
  syndicateInfo,
  openDrawer,
  isDrawerOpen,
  onData,
}: any) => {
  const sendDataToParent = () => {
    onData(true);
  };
  const user: any = useSelector((state: RootState) => state.user.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [loading, setLoading] = useState(false);
  const [buttonDisableTemp, setButtonDisableTemp]=useState(false)

  let text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {

    if(syndicateInfo !== null){
      setButtonDisableTemp(false)
    }else{
      setButtonDisableTemp(true)
    }

  }, [syndicateInfo])

  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false)
    }, 1000);
  }

  const onFollow = async (syndId: any) => {
    setButtonDisableTemp(true)
    try {
      setLoading(true)
      const { status } = await postFollowSyndicate(
        {
          member_id: user.id,
          connection: "follower",
        },
        syndId,
        authToken
      );
      if (status === 200) {
        toast.success("Syndicate Followed", toastUtil);
        let elem: any = document.getElementById(`synd-${syndId}`);
        let button = document.createElement("button");
        button.innerText = "Followed";
        elem.innerHTML = "";
        elem.appendChild(button);
      }
      removeSpinning()
    } catch (error: any) {
      removeSpinning()
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      setLoading(false)
      sendDataToParent()
    }
  };
  const onunFollow = async (syndId: any, memberId:any) => {
    setButtonDisableTemp(true)
    try {
      setLoading(true)
      const { status } = await postunFollowSyndicate(
        syndId,
        memberId,
        authToken
      );
      if (status === 200) {
        toast.success("Syndicate Unfollowed", toastUtil);
        let elem: any = document.getElementById(`synd-${syndId}`);
        let button = document.createElement("button");
        button.innerText = "Unfollowed";
        elem.innerHTML = "";
        elem.appendChild(button);
      }
      removeSpinning()
    } catch (error: any) {
      removeSpinning()
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      setLoading(false)
      sendDataToParent()
    }
  };

  const getButtonStatus = () => {
    if (buttonDisableTemp) return

    return syndicateInfo?.following ? "Following" : "Follow"
  }


  const displayText = showFullText ? text : text.slice(0, 800);
  return (
    <main>
      <Drawer
        drawerWidth="w-[700px]"
        isOpen={openDrawer}
        setIsOpen={(val: boolean) => {
          setButtonDisableTemp(true)
          isDrawerOpen(val)
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
            <section className="border-b-[1px] border-b-neutral-200 pb-10 w-full items-center capitalize justify-between flex">
              <div className="inline-flex items-center">
                <span>
                  <img
                    className=" h-9 w-9 mr-2.5 rounded-full"
                    src={syndicateInfo?.profile?.logo}
                  ></img>
                </span>
                <span className="items-center">{syndicateInfo?.name}</span>
              </div>
              <span className="items-center">
                <Button
                    type={
                      syndicateInfo?.following && !buttonDisableTemp ? "outlined": "primary"
                    }
                    centeredSpinner
                    className="!min-w-[90px]"
                    onClick={() => {
                      if(syndicateInfo?.following) {
                        onunFollow(syndicateInfo?.id, syndicateInfo?.membership_id)
                      }else{
                        onFollow(syndicateInfo?.id);
                      }
                    }}
                    loading={buttonDisableTemp}
                  >
                    {getButtonStatus()}
                  </Button>

              </span>
            </section>
          </header>
          <section className="items-center">
            <aside className=" justify-end flex">
              <span className="font-semibold text-neutral-400 text-xs">
                Formation date:
              </span>
              <span className="pr-2 pl-1 text-xs">
                {syndicateInfo?.created_at}
              </span>
            </aside>
            <aside>
              <div className=" pr-2 flex items-center">
                <span className="font-bold mb-2">About</span>
              </div>
              <div className="fading-text-container text-sm">
                <p className={showFullText ? "" : "masked"}>{displayText}</p>
                {text.length > 800 && (
                  <button
                    className=" text-xs text-neutral-500"
                    onClick={toggleText}
                  >
                    {showFullText ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            </aside>
            <aside className="mt-4">
              <div className=" pr-2 flex items-center">
                <span className="font-bold mb-4">Portfolio Stats</span>
              </div>
              <aside className="flex justify-between items-center text-sm px-6">
                <div className="rounded-md border-[1.75px] border-[#404040] w-full pl-3 py-3">
                  <div className=" text-[#737373]">Total deals</div>
                  <div className="mt-2 font-bold text-xl">
                    {syndicateInfo?.total_deals || "N/A"}
                  </div>
                </div>
                <div className="rounded-md border-[1.75px] border-[#404040] w-full pl-3 ml-16 py-3">
                  <div>
                    <span className="text-[#737373]">Active deals</span>
                    
                    <span className=" bottom-1 ml-3 inline-flex items-center justify-around bg-green-100 py-1 px-1.5 rounded-[9px] h-[20px] gap-1">
                      <RaiseIcon />
                      <span className="text-green-800 text-sm font-medium">
                        {"Raising"}
                      </span>
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-xl">
                    {syndicateInfo?.active_deals || "N/A"}
                  </div>
                </div>
                
              </aside>
              <aside className="flex justify-between items-center text-sm px-6 mt-4">
                <div className="rounded-md border-[1.75px] border-[#404040] w-full pl-3 py-3">
                  <div className=" text-[#737373]">Raised Amount</div>
                  <div className="mt-2 font-bold text-xl">
                    {comaFormattedNumber(syndicateInfo?.raised_amount, DealCheckType.STARTUP) || "N/A"}
                  </div>
                </div>
                <div className="rounded-md border-[1.75px] border-[#404040] w-full pl-3 ml-16 py-3">
                  <div>
                    <span className="text-[#737373]">Number of times raised</span>
                  </div>
                  <div className="mt-2 font-bold text-xl">
                    {syndicateInfo?.no_times_raised || "N/A"}
                  </div>
                </div>
                
              </aside>
              
            </aside>
            <aside className="mt-6">
              <div className=" pr-2 flex items-center">
                <span className="font-bold ">Disclaimers</span>
              </div>
              <aside className="flex justify-between items-center text-sm  overflow-y-auto">
                <p className="text-xs">{text.slice(0, 600)}</p>
              </aside>
            </aside>
          </section>
        </div>
        )}
      </Drawer>
        
    </main>
  );
};
export default SyndicateInfoDrawer;

{
  /*  */
}
