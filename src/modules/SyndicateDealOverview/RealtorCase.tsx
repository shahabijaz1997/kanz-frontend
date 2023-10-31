import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import { RootState } from "../../redux-toolkit/store/store";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import Chevrond from "../../ts-icons/chevrond.svg";
import Button from "../../shared/components/Button";
import Spinner from "../../shared/components/Spinner";
import ArrowIcon from "../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../ts-icons/downloadIcon.svg";
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import CurrencySVG from "../../assets/svg/currency.svg";
import ImgSVG from "../../assets/svg/img.svg";
import BedSVG from "../../assets/svg/bed.svg";
import ChefSVG from "../../assets/svg/chef.svg";
import TubSVG from "../../assets/svg/tub.svg";
import CarSVG from "../../assets/svg/car.svg";
import SwimSVG from "../../assets/svg/swim.svg";
import BagSVG from "../../assets/svg/bag.svg";
import DollarSVG from "../../assets/svg/dol.svg";
import ChartSVG from "../../assets/svg/chart.svg";
import PiChartSVG from "../../assets/svg/pichart.svg";
import {
  comaFormattedNumber,
  formatDate,
  numberFormatter,
} from "../../utils/object.utils";
import {
  ApplicationStatus,
  DealStatus,
  FileType,
} from "../../enums/types.enum";
import {
  addCommentOnDeal,
  getDealDetail,
  signOff,
  syndicateApprove,
} from "../../apis/deal.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";

const RealtorCase = ({ id }: any) => {
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [deal, setdeal]: any = useState([]);
  const [selectedDocs, setSelectedDocs]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [modalOpen, setModalOpen]: any = useState(null);
  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });

  useLayoutEffect(() => {
    onGetdeal();
  }, [id]);

  const onGetdeal = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealDetail(Number(id), authToken);
      if (status === 200) {
        setdeal(data?.status?.data);
        setSelectedDocs(data?.status?.data?.docs[0]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const postSignOff = async () => {
    try {
      setLoading(true);
      let payload = {
        invite: {
          status: "accepted",
        },
      };
      let { status, data } = await syndicateApprove(
        payload,
        deal?.id,
        deal?.invite?.id,
        authToken
      );
      if (status === 200) {
        toast.success("Congratulations! Deal Signed Off");
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss();
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const onAddCommentOnDeal = async () => {
    try {
      setLoading(true);
      let payload = {
        message: changes.comment,
        invite_id: deal?.invite?.id,
      };
      let { status, data } = await addCommentOnDeal(
        Number(id),
        authToken,
        payload
      );
      if (status === 200) {
        toast.success(language?.v3?.common?.suces_msg, toastUtil);
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const getRoleBasedUI = () => {
    return (
      <React.Fragment>
        {deal?.selling_price && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start inline-grid place-items-center">
              <img src={DollarSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
                Selling Price
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                ${numberFormatter(deal?.selling_price)}
              </p>
            </div>
          </div>
        )}
        {deal?.expected_dividend_yield && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start inline-grid place-items-center">
              <img src={ChartSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
                Expected Dividend Yield
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(deal?.expected_dividend_yield)}%
              </p>
            </div>
          </div>
        )}
        {deal?.expected_annual_return && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start inline-grid place-items-center">
              <img src={PiChartSVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
                Expected Annual Appreciation
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                {comaFormattedNumber(deal?.expected_annual_return)}%
              </p>
            </div>
          </div>
        )}
        {deal?.features?.rental_amount && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <div className="bg-cbc-grey-sec rounded-md h-8 w-8 inline-block align-start inline-grid place-items-center">
              <img src={CurrencySVG} alt="" />
            </div>
            <div className="w-[80%] inline-block align-start">
              <h3 className="text-neutral-900 font-medium text-sm pb-1">
                Property on a Rent
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                ${numberFormatter(deal?.features?.rental_amount)} (
                {deal?.features?.rental_period})
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start pb-10">
        <Sidebar type={KanzRoles.SYNDICATE} />
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth h-full p-[5rem] flex items-start"
            style={{ width: "calc(100% - 250px)" }}
          >
            {/* Section Left */}
            <section className="w-[60%]">
              <div
                className="w-full inline-flex pb-4 items-center gap-2 relative top-[-25px] cursor-pointer border-b-[1px] border-b-neutral-200"
                onClick={() => navigate(-1)}
              >
                <Chevrond stroke="#000" className="rotate-90 w-4 h-4" />
                <small className="text-neutral-500 text-sm font-medium">
                  {language?.v3?.common?.investments}
                </small>
              </div>
              <div
                className="w-full inline-flex flex-col pb-8 items-start gap-2 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <h1 className="text-black font-medium text-xl">
                  {deal?.title}
                </h1>
                <p className="text-sm text-neutral-500 font-medium">
                  {deal?.description}
                </p>
              </div>
              <div
                className="inline-flex justify-between w-full mb-4"
                onClick={() => {
                  window.open(selectedDocs?.url, "_blank");
                }}
              >
                <h1 className="text-black font-medium text-2xl">
                  {selectedDocs?.name}
                </h1>
                <Button type="outlined">{language?.v3?.button?.new_tab}</Button>
              </div>
              {/* Images Section */}
              {deal?.docs?.length && (
                <section className="h-[500px] rounded-[8px] overflow-hidden relative">
                  <aside className="w-full inline-flex gap-2 h-full">
                    {deal?.docs[0]?.attachment_kind === FileType.PDF ? (
                      <embed
                        src={deal?.docs[0]?.url}
                        className="h-full w-1/2 border-[1px] border-neutral-200 shadow shadow-cs-1  rounded-[8px]"
                      ></embed>
                    ) : (
                      <img
                        src={deal?.docs[0]?.url}
                        alt={deal?.docs[0]?.name}
                        className="h-full w-1/2 border-[1px] border-neutral-200 shadow shadow-cs-1  rounded-[8px]"
                      />
                    )}
                    <div className="inline-flex flex-col justify-between h-full w-1/2 overflow-hidden">
                      {deal?.docs[1]?.attachment_kind === FileType.PDF ? (
                        <embed
                          src={deal?.docs[1]?.url}
                          className="w-full h-[48%] border-[1px] border-neutral-200 shadow shadow-cs-1 rounded-[8px]"
                        ></embed>
                      ) : (
                        <img
                          src={deal?.docs[1]?.url}
                          alt={deal?.docs[1]?.name}
                          className="w-full h-[48%] border-[1px] shadow shadow-cs-1  border-neutral-200 rounded-[8px]"
                        />
                      )}
                      {deal?.docs[2]?.attachment_kind === FileType.PDF ? (
                        <embed
                          src={deal?.docs[2]?.url}
                          className="w-full h-[48%] border-[1px] border-neutral-200 shadow shadow-cs-1  rounded-[8px]"
                        ></embed>
                      ) : (
                        <img
                          src={deal?.docs[2]?.url}
                          alt={deal?.docs[2]?.name}
                          className="w-full h-[48%] border-[1px] border-neutral-200 shadow shadow-cs-1  rounded-[8px]"
                        />
                      )}
                    </div>
                  </aside>
                  <Button
                    prefix={<img src={ImgSVG} />}
                    className="absolute right-2 bottom-2 !py-1 bg-white border-[1px] border-gray-900 !text-gray-900 hover:!bg-white !font-normal"
                  >
                    View all photos
                  </Button>
                </section>
              )}
              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 flex justify-between">
                {deal?.features?.bedrooms && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      Bedrooms
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={BedSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {deal?.features?.bedrooms}
                      </small>
                    </span>
                  </section>
                )}
                {deal?.features?.kitchen && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {deal?.features?.kitchen}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={ChefSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">2</small>
                    </span>
                  </section>
                )}
                {deal?.features?.washroom && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {deal?.features?.washroom}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={TubSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">2</small>
                    </span>
                  </section>
                )}
                {deal?.features?.parking && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      deal?.features?.parking
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={CarSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {" "}
                        {deal?.features?.parking}
                      </small>
                    </span>
                  </section>
                )}
                {deal?.features?.swimming_pool && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {deal?.features?.swimming_pool}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={SwimSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">Shared</small>
                    </span>
                  </section>
                )}
              </aside>
              <section className="mt-10 rounded-md px-5 py-3 mb-6">
                <div className="bg-cyan-800 rounded-full h-10 w-10 overflow-hidden inline-grid place-items-center inline-block align-top mr-4">
                  <img src={BagSVG} alt="Bag" />
                </div>
                <div className="inline-block w-[80%] align-top">
                  <div className="font-bold text-neutral-900 text-sm mb-2">
                    3% Cashback Offer using promo code: BB24
                  </div>
                  <small className="text-neutral-700 font-normal text-sm block w-full">
                    Secure your investment within the first 24 hours, and you'll
                    enjoy an exclusive cashback offer
                  </small>
                </div>
              </section>
              <div className="inline-flex justify-between w-full my-10">
                <h1 className="text-black font-medium text-2xl">
                  {language?.v3?.common?.risk_disc}
                </h1>
                <p className="text-sm font-medium"></p>
              </div>
              {deal?.status !== ApplicationStatus.APPROVED && (
                <Button
                  onClick={() => {
                    postSignOff();
                  }}
                  className="w-full"
                >
                  Approve
                </Button>
              )}
            </section>

            {/* Invisible Section */}
            <section className="w-[10%]"></section>

            {/* Section Right */}
            <section className="w-[30%]">
              {/* Show/Hide based on some conditions */}
              {deal?.invite && deal?.invite?.status !== DealStatus.ACCEPTED && (
                <div className="w-full inline-flex justify-end gap-4">
                  <Button type="outlined" onClick={() => setModalOpen(true)}>
                    {language?.v3?.button?.req_change}
                  </Button>
                  <Button>{language?.v3?.button?.interested}</Button>
                </div>
              )}
              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5">
                <h2 className="text-neutral-700 text-xl font-medium">
                  {language?.v3?.common?.invest_details}
                </h2>
                <small className="text-neutral-500 text-sm font-normal">
                  {language?.v3?.common?.end_on} {formatDate(deal?.end_at)}
                </small>

                {getRoleBasedUI()}
              </aside>
              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-cbc-check max-h-[400px] overflow-y-auto no-scrollbar mb-4">
                {React.Children.toArray(
                  deal?.docs?.map((doc: any) => {
                    return (
                      <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200 mb-2">
                        <span className="inline-flex items-center w-[80%]">
                          <div className="bg-white w-14 h-14 inline-flex justify-center flex-col w-full">
                            <h4
                              className="inline-flex items-center gap-3 max-w-[200px] cursor-pointer"
                              onClick={() => {
                                window.open(doc?.url, "_blank");
                              }}
                            >
                              <div className="text-sm text-black font-medium ">
                                {language?.v3?.button?.view}
                              </div>
                              <ArrowIcon stroke="#000" />
                            </h4>
                            <h2
                              className="text-sm font-medium text-neutral-500 max-w-full truncate"
                              title={doc?.name}
                            >
                              {doc?.name}
                            </h2>
                          </div>
                        </span>

                        <div
                          className="h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200"
                          onClick={() => {
                            const downloadLink = document.createElement("a");
                            downloadLink.href = doc?.url;
                            downloadLink.target = "_blank";
                            downloadLink.download = doc?.name;
                            downloadLink.click();
                            downloadLink.remove();
                          }}
                        >
                          <DownloadIcon />
                        </div>
                      </section>
                    );
                  })
                )}
              </aside>
              {deal?.property_links && (
                <aside>
                  {" "}
                  <h2 className="text-neutral-700 text-xl font-medium">
                    Property Links
                  </h2>
                  <div className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5  max-h-[400px] overflow-y-auto no-scrollbar mb-4">
                    <div className="inline-flex flex-col justify-between h-full w-1/2 overflow-hidden">
                      {React.Children.toArray(
                        deal?.property_links?.map((link: any) => {
                          return (
                            <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200 mb-2">
                              <span className="inline-flex items-center w-[80%]">
                                <div className="bg-white w-14 h-14 inline-flex justify-center flex-col w-full">
                                  <h2
                                    className="text-sm font-medium text-neutral-500 max-w-full truncate"
                                    title={link?.name}
                                  >
                                    {link?.name}
                                  </h2>
                                </div>
                              </span>
                            </section>
                          );
                        })
                      )}
                    </div>
                  </div>
                </aside>
              )}
            </section>
          </section>
        )}
      </aside>

      <Modal show={modalOpen ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[400px] rounded-md h-full">
            <header className="bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center">
              <h3 className="text-xl font-medium text-neutral-700">
                Deal Approval
              </h3>
              <div
                className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer"
                onClick={() => {
                  setModalOpen(false);
                  setChanges({ comment: "", action: "", document: null });
                  // setFiles([]);
                }}
              >
                <CrossIcon stroke="#000" />
              </div>
            </header>

            <section className="py-3 px-4">
              <div className="mb-6">
                <label
                  htmlFor=""
                  className="text-neutral-900 font-medium text-sm"
                >
                  Add Comment
                </label>
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder="Add Comment"
                  className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 w-full">
              <Button
                disabled={!changes.comment}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => onAddCommentOnDeal()}
              >
                {language.buttons.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
    </main>
  );
};
export default RealtorCase;
