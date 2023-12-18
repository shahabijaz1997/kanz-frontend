import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../../shared/components/Header";


import {
  comaFormattedNumber,
  formatDate,
  numberFormatter,
  timeAgo,
} from "../../../utils/object.utils";

import {

  getDealDetail,
} from "../../../apis/deal.api";
import Button from "../../../shared/components/Button";
import Spinner from "../../../shared/components/Spinner";
import { RootState } from "../../../redux-toolkit/store/store";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import GuestModalLockIcon from "../../../ts-icons/GuestModalLockIcon.svg";
import { RoutesEnums } from "../../../enums/routes.enum";
import { KanzRoles } from "../../../enums/roles.enum";
import { useNavigate } from "react-router-dom";

const CURRENCIES = ["USD", "AED"];

const StartupCase = ({ id, dealToken, dealDetail }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const [deal, setdeal]: any = useState(dealDetail);
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

    {deal?.equity_type && (
  <>
    {deal?.instrument_type && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {language?.v3?.deal?.instrument_type}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal?.instrument_type || language?.v3?.common?.not_added}
        </p>
      </div>
    )}
    {deal?.stage && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {language?.v3?.table?.stage}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal?.stage || language?.v3?.common?.not_added}
        </p>
      </div>
    )}
    {deal?.selling_price && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Deal Target"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {comaFormattedNumber(deal?.selling_price) ||
            language?.v3?.common?.not_added}
        </p>
      </div>
    )}
    {deal?.valuation && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {language?.v3?.table?.valuation}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          ${comaFormattedNumber(deal?.valuation)} ({deal?.equity_type})
        </p>
      </div>
    )}
    {deal?.valuation_type && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {language?.v3?.table?.type}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal?.valuation_type}
        </p>
      </div>
    )}
    {deal?.terms &&  (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Minimum Check Size"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
        {deal.terms[0]?.is_enabled ? (numberFormatter(deal.terms[0]?.value) || "Yes") : "No"}
        </p>
      </div>
    )}
    {deal?.terms &&  (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Pro Rata"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[1]?.is_enabled ? "Yes" : "No"}
        </p>
      </div>
    )}
  </>
)}   

{deal?.safe_type && (
  <>
    {deal?.instrument_type && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {language?.v3?.deal?.instrument_type}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal?.instrument_type || language?.v3?.common?.not_added}
        </p>
      </div>
    )}

    {deal?.safe_type && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Safe type"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal?.safe_type || language?.v3?.common?.not_added}
        </p>
      </div>
    )}

  {deal?.selling_price && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.target}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {numberFormatter(deal?.selling_price) ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}

    {deal?.terms && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Valuation Cap"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[0]?.is_enabled ? (deal.terms[0]?.value || "Yes") : "No"}
        </p>
      </div>
    )}

    {deal?.terms &&  (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Discount"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[1]?.is_enabled ? (deal.terms[1]?.value || "Yes") : "No"}
        </p>
      </div>
    )}

    {deal?.terms &&  (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"MFN Only"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[2]?.is_enabled ? (Object.keys(deal.terms[2]?.value).length > 0 ? "Yes" : "No") : "No"}
        </p>
      </div>
    )}

    {deal?.terms &&  (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Minimum Check Size"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[3]?.is_enabled ? (deal.terms[3]?.value || "Yes") : "No"}
        </p>
      </div>
    )}

    {deal?.terms  && (
      <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
        <h3 className="text-neutral-900 font-medium text-sm">
          {"Pro Rata"}
        </h3>
        <p className="text-neutral-900 font-normal text-sm capitalize">
          {deal.terms[4]?.is_enabled ? (Object.keys(deal.terms[4]?.value).length > 0 ? "Yes" : "No") : "No"}
        </p>
      </div>
    )}
  </>
)}
  
      
        {!deal?.equity_type && !deal?.safe_type && deal?.selling_price &&  (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.sellingPrice}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {numberFormatter(deal?.selling_price) ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.status && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.status}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.status || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.start_at && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.start_at}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.start_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.end_at && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.end_at}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.end_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.committed > 0 && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.committed}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {numberFormatter(deal?.committed)}
            </p>
          </div>
        )}
        {deal?.location && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.location}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.location}
            </p>
          </div>
        )}
        {deal?.raised > 0 && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.raised}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              ${numberFormatter(deal?.raised)}
            </p>
          </div>
        )}
        {deal?.size && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.table?.size}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {comaFormattedNumber(deal?.size)} sqft
            </p>
          </div>
        )}
        {deal?.expected_annual_return && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.expected_annual_return}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.expected_annual_return + "%" ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.expected_dividend_yield && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.expected_dividend_yield}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.expected_dividend_yield + "%" ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.features?.bedrooms && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.beds}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.features?.bedrooms}
            </p>
          </div>
        )}
        {deal?.features?.kitchen && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.kitchen}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.features?.kitchen}
            </p>
          </div>
        )}
        {deal?.features?.washroom && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.washroom}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.features?.washroom}
            </p>
          </div>
        )}
        {deal?.features?.parking && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.parking}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.features?.parking}
            </p>
          </div>
        )}
        {deal?.features?.swimming_pool && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.swim}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {deal?.features?.swimming_pool}
            </p>
          </div>
        )}
        {deal?.features?.rental_amount && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.por_2}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              ${numberFormatter(deal?.features?.rental_amount)} (
              {deal?.features?.rental_period})
            </p>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <main className="h-full max-h-full overflow-y-hidden">
         <section>
        <Header showMenu={false} showLanguageDropdown={!authToken ? true : false} />
      </section>
      <div className="w-full h-full flex justify-center" style={{ height: "calc(100% - 70px)"}}>
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth mt-4 h-full w-full pt-[5rem] px-[5rem] flex items-center justify-center overflow-y-auto"
            
          >
            <section className="w-[60%]">
              <div className="inline-flex justify-between w-full">
                <h1 className="text-black font-medium text-2xl">
                  {deal?.title}
                </h1>
              </div>
              <p className="text-black">
                  {deal?.description}
                </p>
                <aside className="border-[1px] border-neutral-200 rounded-md w-full pt-3 px-3 mt-5 mb-10">
                <h2 className="text-neutral-700 text-xl font-medium">
                  {language?.v3?.common?.invest_details}
                </h2>
                <small className="text-neutral-500 text-sm font-normal">
                  {language?.v3?.common?.end_on} {(deal?.end_at)}
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
                  Unlock Investment Opportunities!
                </div>
                <div className="w-full items-center justify-center flex mt-2  text-[#737373]">
                  Unlock exclusive deals! Log in for full access and detailed
                  info.
                </div>
                <div className="w-full mt-6">
                  <Button
                    className="px-5 w-[80%]"
                    onClick={() => navigate(RoutesEnums.LOGIN)}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="w-full mt-4 items-center justify-center flex">
                  <span className=" text-[#737373]">Not a Memeber yet?</span>
                  <span
                    className="ml-1 font-medium text-[#155E75] cursor-pointer"
                    onClick={() =>
                      navigate(RoutesEnums.SIGNUP, {
                        state: KanzRoles.INVESTOR,
                      })
                    }
                  >
                    Sign up
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
