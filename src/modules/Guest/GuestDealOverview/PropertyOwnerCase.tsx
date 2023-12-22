import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import Header from "../../../shared/components/Header";
import Button from "../../../shared/components/Button";
import Spinner from "../../../shared/components/Spinner";
import CurrencySVG from "../../../assets/svg/currency.svg";
import DollarSVG from "../../../assets/svg/dol.svg";
import ChartSVG from "../../../assets/svg/chart.svg";
import PiChartSVG from "../../../assets/svg/pichart.svg";

import {
  comaFormattedNumber,
} from "../../../utils/object.utils";
import Modal from "../../../shared/components/Modal";
import CrossIcon from "../../../ts-icons/crossIcon.svg";
import GuestModalLockIcon from "../../../ts-icons/GuestModalLockIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../../enums/routes.enum";
import { KanzRoles } from "../../../enums/roles.enum";
import { DealCheckType } from "../../../enums/types.enum";

const PropertyOwnerCase = ({  dealDetail }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();
  const [loading, setLoading]: any = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  useLayoutEffect(() => {
    setTimeout(openModal, 30000);
  }, []);

  function openModal() {
    setModalOpen(true);
  }
  const formattedAddress = `${dealDetail?.address?.street_address}, ${dealDetail?.address?.building_name}, ${dealDetail?.address?.area}, ${dealDetail?.address?.city}, ${dealDetail?.address?.state}, ${dealDetail?.address?.country_name}`;
  const getRoleBasedUI = () => {
    return (
      <React.Fragment>
        {dealDetail?.selling_price && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start place-items-center">
              <img src={DollarSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
              {language?.v3?.fundraiser?.selling_price}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(dealDetail?.selling_price, DealCheckType.PROPERTY)}
              </p>
            </div>
          </div>
        )}
        {dealDetail?.expected_dividend_yield && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start place-items-center">
              <img src={ChartSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
              {language?.v3?.deal?.expected_dividend_yield}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(dealDetail?.expected_dividend_yield)}%
              </p>
            </div>
          </div>
        )}
        {dealDetail?.expected_annual_return && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start place-items-center">
              <img src={PiChartSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
                {language?.v3?.deal?.exp_ann}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(dealDetail?.expected_annual_return)}%
              </p>
            </div>
          </div>
        )}
        {dealDetail?.features?.rental_amount && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start place-items-center">
              <img src={CurrencySVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
              {language?.v3?.deal?.por}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(dealDetail?.features?.rental_amoun, DealCheckType.PROPERTY)} (
                {dealDetail?.features?.rental_period})
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };
  return (
    <main className="h-full max-h-full overflow-y-hidden">
      <section>
        <Header
         onSuperLogout={(e:boolean) => {
          setLoading(e)
        }}
          showMenu={false}
          showLanguageDropdown={!authToken ? true : false}
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
          <section className="bg-cbc-auth h-full w-full pt-[5rem] px-[5rem] flex items-center justify-center overflow-y-auto">
            <section className="w-[60%]">
              <div className="inline-flex justify-between w-full">
                <h1 className="text-black font-medium text-2xl">
                  {dealDetail?.title}
                </h1>
                <Button
                  type="outlined"
                  className="!cursor-default !hover:border-none"
                >
                  {comaFormattedNumber(dealDetail?.size)}&nbsp;SQFT
                </Button>
              </div>
              <p className="text-black">{dealDetail?.description}</p>
              {dealDetail?.address && (
                <div className="mb-4 mt-4 text-sm">{formattedAddress}</div>
              )}

              <aside className="border-[1px] border-neutral-200 rounded-md w-full pt-3 px-3 mt-5">
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
export default PropertyOwnerCase;
