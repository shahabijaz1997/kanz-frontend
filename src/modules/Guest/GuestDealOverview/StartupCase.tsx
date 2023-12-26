import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../../shared/components/Header";

import {
  comaFormattedNumber,
} from "../../../utils/object.utils";

import Button from "../../../shared/components/Button";
import Spinner from "../../../shared/components/Spinner";
import { RootState } from "../../../redux-toolkit/store/store";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import GuestModalLockIcon from "../../../ts-icons/GuestModalLockIcon.svg";
import { RoutesEnums } from "../../../enums/routes.enum";
import { KanzRoles } from "../../../enums/roles.enum";
import { useNavigate } from "react-router-dom";
import { DealCheckType } from "../../../enums/types.enum";


const StartupCase = ({ dealDetail }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const [loading, setLoading]: any = useState(false);
  useLayoutEffect(() => {
    setTimeout(openModal, 30000);
  }, []);

  function openModal() {
    setModalOpen(true);
  }

  const getRoleBasedUI = () => {
    return (
      <React.Fragment>
        {dealDetail?.equity_type && (
          <>
            {dealDetail?.instrument_type && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.deal?.instrument_type}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail?.instrument_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {dealDetail?.stage && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.table?.stage}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail?.stage || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {dealDetail?.selling_price && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.deal_target}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {comaFormattedNumber(
                    dealDetail?.selling_price,
                    DealCheckType.STARTUP
                  ) || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {dealDetail?.valuation && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.table?.valuation}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {comaFormattedNumber(dealDetail?.valuation, DealCheckType.STARTUP)}{" "}
                  ({dealDetail?.equity_type})
                </p>
              </div>
            )}
            {dealDetail?.valuation_type && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.table?.type}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail?.valuation_type}
                </p>
              </div>
            )}
            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.min_check_size}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[0]?.is_enabled
                    ? comaFormattedNumber(
                        dealDetail.terms[0]?.value,
                        DealCheckType.STARTUP
                      ) || language?.v3?.fundraiser?.yes
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}
            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.pro_rata}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[1]?.is_enabled
                    ? language?.v3?.fundraiser?.yes
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}
          </>
        )}

        {dealDetail?.safe_type && (
          <>
            {dealDetail?.instrument_type && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.deal?.instrument_type}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail?.instrument_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {dealDetail?.safe_type && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.safe_type}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail?.safe_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {dealDetail?.selling_price && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.table?.target}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {comaFormattedNumber(
                    dealDetail?.selling_price,
                    DealCheckType.STARTUP
                  ) || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.valuation_cap}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[0]?.is_enabled
                    ? comaFormattedNumber(
                        dealDetail.terms[0]?.value,
                        DealCheckType.STARTUP
                      ) || language?.v3?.fundraiser?.yes
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}

            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.discount}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[1]?.is_enabled
                    ? dealDetail.terms[1]?.value + "%" ||
                      language?.v3?.fundraiser?.yes
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}

            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.mfn_only}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[2]?.is_enabled
                    ? Object.keys(dealDetail.terms[2]?.value).length > 0
                      ? language?.v3?.fundraiser?.yes
                      : language?.v3?.fundraiser?.no
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}

            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.min_check_size}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[3]?.is_enabled
                    ? comaFormattedNumber(
                        dealDetail.terms[3]?.value,
                        DealCheckType.STARTUP
                      ) || language?.v3?.fundraiser?.yes
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}

            {dealDetail?.terms && (
              <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
                <h3 className="text-neutral-900 font-medium text-sm">
                  {language?.v3?.fundraiser?.pro_rata}
                </h3>
                <p className="text-neutral-900 font-normal text-sm capitalize">
                  {dealDetail.terms[4]?.is_enabled
                    ? Object.keys(dealDetail.terms[4]?.value).length > 0
                      ? language?.v3?.fundraiser?.yes
                      : language?.v3?.fundraiser?.no
                    : language?.v3?.fundraiser?.no}
                </p>
              </div>
            )}
          </>
        )}

        {!dealDetail?.equity_type && !dealDetail?.safe_type && dealDetail?.selling_price && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.sellingPrice}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(
                dealDetail?.selling_price,
                DealCheckType.STARTUP
              ) || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.status && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.status}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.status || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.start_at && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.start_at}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.start_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.end_at && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.end_at}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.end_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.committed > 0 && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.committed}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(dealDetail?.committed, DealCheckType.STARTUP)}
            </p>
          </div>
        )}
        {dealDetail?.location && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.location}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.location}
            </p>
          </div>
        )}
        {dealDetail?.raised > 0 && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.raised}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(dealDetail?.raised, DealCheckType.STARTUP)}
            </p>
          </div>
        )}
        {dealDetail?.size && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.size}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(dealDetail?.size)} sqft
            </p>
          </div>
        )}
        {dealDetail?.expected_annual_return && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.expected_annual_return}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.expected_annual_return + "%" ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.expected_dividend_yield && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.expected_dividend_yield}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.expected_dividend_yield + "%" ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {dealDetail?.features?.bedrooms && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.beds}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.features?.bedrooms}
            </p>
          </div>
        )}
        {dealDetail?.features?.kitchen && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.kitchen}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.features?.kitchen}
            </p>
          </div>
        )}
        {dealDetail?.features?.washroom && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.washroom}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.features?.washroom}
            </p>
          </div>
        )}
        {dealDetail?.features?.parking && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.parking}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.features?.parking}
            </p>
          </div>
        )}
        {dealDetail?.features?.swimming_pool && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.swim}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {dealDetail?.features?.swimming_pool}
            </p>
          </div>
        )}
        {dealDetail?.features?.rental_amount && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.por_2}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(
                dealDetail?.features?.rental_amount,
                DealCheckType.STARTUP
              )}{" "}
              ({dealDetail?.features?.rental_period})
            </p>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header
          showMenu={false}
          showLanguageDropdown={!authToken ? true : false}
          onSuperLogout={(e: boolean) => {
            setLoading(e);
          }}
        />
      </section>
      <div
        className="w-full h-full flex justify-center"
        style={{ height: "calc(100% - 70px)" }}
      >
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section className="bg-cbc-auth mt-4 h-full w-full pt-[5rem] px-[5rem] flex items-center justify-center overflow-y-auto">
            <section className="w-[60%]">
              <div className="inline-flex justify-between w-full">
                <h1 className="text-black font-medium text-2xl">
                  {dealDetail?.title}
                </h1>
              </div>
              <p className="text-black">{dealDetail?.description}</p>
              <aside className="border-[1px] border-neutral-200 rounded-md w-full pt-3 px-3 mt-5 mb-10">
                <h2 className="text-neutral-700 text-xl font-medium">
                  {language?.v3?.common?.invest_details}
                </h2>
                <small className="text-neutral-500 text-sm font-normal">
                  {language?.v3?.common?.end_on} {dealDetail?.end_at}
                </small>

                {getRoleBasedUI()}
              </aside>
            </section>
          </section>
        )}
      </div>
      <Modal
        className={"w-[700px] screen1024:w-[300px]"}
        show={modalOpen ? true : false}
      >
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[700px] rounded-md p-5 h-full">
            <section>
              <div className="justify-end inline-flex pt-3 px-3 w-full">
                <div
                  className="bg-white h-8 w-8 p-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  <CrossIcon stroke="#000" />
                </div>
              </div>
            </section>
            <section className=" mb-6  ">
              <div className="w-full items-center gap-5">
                <div className=" overflow-hidden w-full inline-flex justify-center items-center py-7 px-2">
                  <span className="rounded-full bg-[#E8FAFF] p-3">
                    <GuestModalLockIcon />
                  </span>
                </div>
                <div className="w-full items-center justify-center flex text-lg font-bold">
                  {language?.v3?.fundraiser?.unlock_investment_opportunities}
                </div>
                <div className="w-full items-center justify-center flex mt-2  text-[#737373]">
                  {language?.v3?.fundraiser?.unlock_exclusive_deals}
                </div>
                <div className="w-full mt-6">
                  <Button
                    className="px-5 w-[80%]"
                    onClick={() => navigate(RoutesEnums.LOGIN)}
                  >
                  {language?.v3?.fundraiser?.sign_in}

                  </Button>
                </div>
                <div className="w-full mt-4 items-center justify-center flex">
                  <span className=" text-[#737373]">
                    {" "}
                    {language?.v3?.fundraiser?.not_a_member_yet}
                  </span>
                  <span
                    className="ml-1 font-medium text-[#155E75] cursor-pointer"
                    onClick={() =>
                      navigate(RoutesEnums.SIGNUP, {
                        state: KanzRoles.INVESTOR,
                      })
                    }
                  >
                    {language?.v3?.fundraiser?.sign_up}

                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </Modal>
    </main>
  );
};
export default StartupCase;
