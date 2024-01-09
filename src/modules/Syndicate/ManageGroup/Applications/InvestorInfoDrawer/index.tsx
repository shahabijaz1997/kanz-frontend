import React, { useEffect, useState } from "react";
import Drawer from "../../../../../shared/components/Drawer";
import Button from "../../../../../shared/components/Button";
import Spinner from "../../../../../shared/components/Spinner";
import { comaFormattedNumber } from "../../../../../utils/object.utils";

import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../../utils/toast.utils";
import {
  DealCheckType,
  InviteStatus,
  MemberType,
} from "../../../../../enums/types.enum";
import {
  postInviteInvestor,
  putAcceptInvite,
  putChangeMemberRole,
} from "../../../../../apis/syndicate.api";

const InvestorInfoDrawer = ({
  loadingOn,
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

  const [loading, setLoading] = useState(true);
  const [hideButton, setHideButton] = useState(true);
  const [buttonDisableTemp, setButtonDisableTemp] = useState(false);

  useEffect(() => {
    setLoading(false);
    setHideButton(false)
  }, [investorInfo]);

  const removeSpinning = () => {
    setTimeout(() => {
      setButtonDisableTemp(false);
      setLoading(false);
    }, 1000);
  };

  const onInviteInvestor = async (investorID: any) => {
    try {
      setHideButton(true);
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
        isDrawerOpen(false);
        toast.success(language?.v3?.investor?.invite_sent, toastUtil);
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      isDrawerOpen(false);
      loadingOn();
    }
  };
  useEffect(() => setLoading(openDrawer), [openDrawer]);

  const acceptInvite = async (inviteID: any) => {
    setHideButton(true);
    setButtonDisableTemp(true);
    try {
      const { status } = await putAcceptInvite(inviteID, authToken);
      if (status === 200) {
        toast.success(language?.v3?.investor?.invite_accepted, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      isDrawerOpen(false);
      loadingOn();
    }
  };
  const changeMemberRole = async (investorID: any, selectedRole: string) => {
    try {
      setHideButton(true);
      setButtonDisableTemp(true);
      const { status } = await putChangeMemberRole(
        investorID,
        {
          syndicate_member: {
            role: selectedRole,
          },
        },
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.investor?.changed, toastUtil);
      }
      removeSpinning();
    } catch (error: any) {
      removeSpinning();
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      isDrawerOpen(false);
      loadingOn();
    }
  };

  return (
    <main>
      <Drawer
        drawerWidth="w-[700px]"
        isOpen={openDrawer}
        setIsOpen={(val: boolean) => {
          setLoading(true);
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
                    {investorInfo?.profile_pic ? (
                      <img
                        className="h-11 w-11 mr-2.5 rounded-full"
                        src={investorInfo.profile_pic}
                        alt={language?.v3?.investor?.profile_pic}
                      />
                    ) : (
                      <div className="h-9 w-9 mr-2.5 rounded-full bg-gray-300 flex items-center justify-center">
                        {investorInfo?.member_name?.substring(0, 2)}
                      </div>
                    )}
                  </span>
                  <span className="items-center font-medium">
                    {investorInfo?.member_name}
                  </span>
                </div>
                <span className="flex gap-3 items-center">
                  {!investorInfo?.invite_id && !investorInfo?.is_member && (
                    <span className="items-center">
                      <Button
                        disabled={hideButton}
                        centeredSpinner
                        className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                        onClick={() => {
                          onInviteInvestor(investorInfo?.member_id);
                        }}
                      >
                        {language?.v3?.investor?.invite}
                      </Button>
                    </span>
                  )}
                  {investorInfo?.invite_status === InviteStatus.PENDING &&
                    investorInfo?.invite_type === "Application" &&
                    !investorInfo?.is_member && (
                      <span className="items-center">
                        <Button
                          disabled={hideButton}
                          centeredSpinner
                          className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                          onClick={() => {
                            acceptInvite(investorInfo?.invite_id);
                          }}
                        >
                          {language?.v3?.investor?.approve}
                        </Button>
                      </span>
                    )}
                  {investorInfo?.is_member &&
                    investorInfo?.role === MemberType.LP && (
                      <span className="items-center">
                        <Button
                          disabled={hideButton}
                          centeredSpinner
                          className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                          onClick={() => {
                            changeMemberRole(investorInfo?.id, MemberType.GP);
                            setButtonDisableTemp(true);
                          }}
                          loading={buttonDisableTemp}
                        >
                          {language?.v3?.investor?.change_to_gp}
                        </Button>
                      </span>
                    )}
                  {investorInfo?.is_member &&
                    investorInfo?.role === MemberType.GP && (
                      <span className="items-center">
                        <Button
                          disabled={hideButton}
                          centeredSpinner
                          className="!min-w-[110px] !p-1.5 !border-[2px] !border-[#155E75]"
                          onClick={() => {
                            changeMemberRole(investorInfo?.id, MemberType.LP);
                            setButtonDisableTemp(true);
                          }}
                          loading={buttonDisableTemp}
                        >
                          {language?.v3?.investor?.change_to_lp}
                        </Button>
                      </span>
                    )}
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
                <p className="text-[#404040] font-medium">
                  {investorInfo?.investor_type}
                </p>
                { investorInfo?.accreditation && (   <p className="text-[#737373] text-sm">
                {investorInfo?.accreditation}
                  </p>)
               
                }
                <aside className="flex gap-24 justify-between items-center mt-5">
                  <div className=" rounded-xl border-[1.75px] border-[#E4E7EC] w-full pl-6 pr-6  py-7 shadow-md">
                    <div className="text-lg font-medium">{"Invested"}</div>
                    <div className="mt-2 font-bold  text-2xl">
                      {comaFormattedNumber(
                        investorInfo?.invested_amount,
                        DealCheckType.STARTUP,
                        false
                      ) || "$72000"}
                    </div>
                  </div>
                  <div
                    className={` rounded-xl border-[1.75px] border-[#E4E7EC] w-full pl-6 pr-6 py-7 shadow-md`}
                  >
                    <div>
                      <span className="text-lg font-medium">
                      {language?.v3?.investor?.investments}
                      </span>
                    </div>
                    <div className="mt-2 font-bold text-2xl">
                      {investorInfo?.no_investments || "02"}
                    </div>
                  </div>
                </aside>
              </aside>
              {investorInfo?.personal_note && (
                <aside className="mt-6">
                  <div className=" pr-2 flex items-center">
                    <span className="font-bold mb-2">
                      {`Personal note from ${investorInfo?.member_name}`}
                    </span>
                  </div>

                  <div className="text-sm">
                    <p>{`${investorInfo?.personal_note}`}</p>
                  </div>
                </aside>
              )}
            </section>
          </div>
        )}
      </Drawer>
    </main>
  );
};
export default InvestorInfoDrawer;
