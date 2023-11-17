import React, { useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import ArrowIcon from "../../../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../../../ts-icons/downloadIcon.svg";
import CustomStatus from "../../../../shared/components/CustomStatus";
import Button from "../../../../shared/components/Button";
import Spinner from "../../../../shared/components/Spinner";
import RaiseIcon from "../../../../ts-icons/raiseIcon.svg";

const SyndicateInfoDrawer = ({
  syndicateInfo,
  openDrawer,
  isDrawerOpen,
  onData,
}: any) => {
  const sendDataToParent = () => {
    const data = "Hello from child!";
    onData(data);
  };
  let text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const displayText = showFullText ? text : text.slice(0, 800);
  return (
    <main>
      <Drawer
        drawerWidth="w-[700px]"
        isOpen={openDrawer}
        setIsOpen={(val: boolean) => isDrawerOpen(val)}
      >
        <div className="z-[103px] custom-scroll">
          <header className="text-lg pr-3 pt-3 pb-2 items-center  w-full sticky">
            <section className="border-b-[1px] border-b-neutral-200 pb-10 w-full items-center capitalize justify-between flex">
              <div className="inline-flex items-center">
                <span>
                  <img
                    className=" h-9 w-9 mr-2.5 rounded-full"
                    src={syndicateInfo?.status?.data?.profile?.logo}
                  ></img>
                </span>
                <span className="items-center">
                  {syndicateInfo?.status?.data?.name}
                </span>
              </div>
              <span className="items-center">
                <Button
                  onClick={() => {
                    sendDataToParent();
                  }}
                >
                  {"Follow"}
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
                {syndicateInfo?.status?.data?.language}
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
                  <div className="mt-2 font-bold text-xl">41</div>
                </div>
                <div className="rounded-md border-[1.75px] border-[#404040] w-full pl-3 ml-16 py-3">
                  <div>
                    <span className="text-[#737373]">
                      Active deals
                    </span>
                    <span className=" bottom-1 ml-3 inline-flex items-center justify-around bg-green-100 py-1 px-1.5 rounded-[9px] h-[20px] gap-1">
                      <RaiseIcon />
                      <span className="text-green-800 text-sm font-medium">{"Raising"}</span>
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-xl">41</div>
                </div>
              </aside>
            </aside>
            <aside className="mt-6">
              <div className=" pr-2 flex items-center">
                <span className="font-bold ">Disclaimers</span>
              </div>
              <aside className="flex justify-between items-center text-sm  overflow-y-auto">
             <p className="text-xs">{text.slice(0,600)}</p>
              </aside>
            </aside>
          </section>
        </div>
      </Drawer>
    </main>
  );
};
export default SyndicateInfoDrawer;

{
  /*  */
}
