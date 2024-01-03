import React, { useEffect, useState } from "react";
import Drawer from "../../../../../shared/components/Drawer";
import Button from "../../../../../shared/components/Button";
import Spinner from "../../../../../shared/components/Spinner";
import {
  comaFormattedNumber,
} from "../../../../../utils/object.utils";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../../utils/toast.utils";
import { DealCheckType, InviteStatus, MemberType } from "../../../../../enums/types.enum";
import { postApproveRequest, postInviteInvestor, putAcceptInvite } from "../../../../../apis/syndicate.api";

const InvestorInfoDrawer = ({
  investorInfo,
  openDrawer,
  isDrawerOpen,
}: any) => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);

  const language: any = useSelector((state: RootState) => state.language.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );


  console.log(investorInfo)

  const [loading, setLoading] = useState(false);
  const [buttonDisableTemp, setButtonDisableTemp] = useState(false);

  let text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    if (investorInfo !== null) {
      setButtonDisableTemp(false);
    } else {
      setButtonDisableTemp(true);
    }
  }, [investorInfo]);

  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false);
    }, 1000);
  };
  console.log(investorInfo)


   const onInviteInvestor = async (investorID: any) => {
    setButtonDisableTemp(true);
    try {
      const { status } = await postInviteInvestor(
        {
          invite: {
            discovery_method: null,
            message: null,
            invitee_id: investorID,
          },
        },
        user.id,
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
   const acceptInvite = async (investorID: any) => {
    setButtonDisableTemp(true);
    try {
      const { status } = await putAcceptInvite(
        investorID,
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
   const changeMemberRole = async (investorID: any, role:string) => {
    try {
      const { status } = await putAcceptInvite(
        investorID,
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


  return (
    <main>
      <Drawer
        drawerWidth="w-[700px]"
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
              <section className="border-b-[1px] border-b-neutral-200 pb-10 w-full items-center capitalize justify-between flex">
                <div className="inline-flex items-center">
                  <span>
                    <img
                      className=" h-9 w-9 mr-2.5 rounded-full"
                      src={investorInfo?.profile?.logo}
                    ></img>
                  </span>
                  <span className="items-center  font-medium">{investorInfo?.Investor}</span>
                </div>
                <span className="flex gap-3 items-center">
                <span className="items-center">
                    <Button
                      type="outlined"
                      centeredSpinner
                      className="!min-w-[110px] !p-1.5 !border-[1px] !border-black !text-black"
                      onClick={() => {
                        isDrawerOpen(false); 
                      }}
                    >
                      {"Cancel"}
                    </Button>
                  </span>
                  {
                     (
                      <span className="items-center">
                      <Button
                        type={
                          investorInfo?.following && !buttonDisableTemp
                            ? "outlined"
                            : "primary"
                        }
                        centeredSpinner
                        className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                        onClick={() => {
                          onInviteInvestor(investorInfo?.id)
                        }}
                      >
                        {"Invite"}
                      </Button>
                    </span>
                    )
                    
                  }
                  {
                    investorInfo?.invite?.status === InviteStatus.AWAITING && (
                      <span className="items-center">
                      <Button
                        centeredSpinner
                        className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                        onClick={() => {
                          acceptInvite(investorInfo?.id)
                        }}
                        loading={buttonDisableTemp}
                      >
                        {"Approve"}
                      </Button>
                    </span>
                    )
                    
                  }
                  {
                    investorInfo?.is_member && investorInfo?.role === MemberType.LP && (
                      <span className="items-center">
                      <Button
                        centeredSpinner
                        className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                        onClick={() => {
                          acceptInvite(investorInfo?.id)
                        }}
                        loading={buttonDisableTemp}
                      >
                        {"Change to GP"}
                      </Button>
                    </span>
                    )
                    
                  }
                  {
                    investorInfo?.is_member && investorInfo?.role === MemberType.GP && (
                      <span className="items-center">
                      <Button
                        centeredSpinner
                        className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                        onClick={() => {
                          acceptInvite(investorInfo?.id)
                        }}
                        loading={buttonDisableTemp}
                      >
                        {"Change to LP"}
                      </Button>
                    </span>
                    )
                    
                  }

                </span>
              </section>
            </header>
            <section className="items-center">
              <aside className="mt-4">
                <div className=" pr-2 flex items-center">
                  <span className="mb-4 font-bold">
                    {language?.v3?.investor?.portfolio_stats}
                  </span>
                </div>
                <p className="text-[#404040] font-medium">Individual Investor</p>
                <p className="text-[#737373] text-sm">I have at least AED 18.36 million in investments</p>
                <aside className="flex gap-24 justify-between items-center mt-5">
                  <div className=" rounded-xl border-[1.75px] border-[#E4E7EC] w-full pl-6 pr-6  py-7 shadow-md">
                    <div className="text-lg font-medium">
                      {"Invested"}
                    </div>
                    <div className="mt-2 font-bold  text-2xl">
                      {comaFormattedNumber(investorInfo?.Invested, DealCheckType.STARTUP,false) || "$72000"}
                    </div>
                  </div>
                  <div
                    className={` rounded-xl border-[1.75px] border-[#E4E7EC] w-full pl-6 pr-6 py-7 shadow-md`}
                  >
                    <div>
                      <span className="text-lg font-medium">
                        {"Investments"}
                      </span>
                    </div>
                    <div className="mt-2 font-bold text-2xl">
                      {investorInfo?.Investments || "02"}
                    </div>
                  </div>
                </aside>
              </aside>
              <aside className="mt-6">
                <div className=" pr-2 flex items-center">
                  <span className="font-bold mb-2">
                    {`Personal note from ${investorInfo?.Investor}`}
                  </span>
                </div>
                <div className="text-sm">
                 <p>{`${investorInfo?.Notes?.props?.children}`}</p>
                </div>
              </aside>
            </section>
          </div>
        )}
      </Drawer>
    </main>
  );
};
export default InvestorInfoDrawer;
