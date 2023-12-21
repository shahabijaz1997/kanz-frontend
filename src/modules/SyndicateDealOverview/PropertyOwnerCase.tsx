import React, { useEffect, useLayoutEffect, useState } from "react";
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
import FileSVG from "../../assets/svg/file.svg";
import ExternalSvg from "../../assets/svg/externl.svg";

import {
  comaFormattedNumber,
  formatDate,
  numberFormatter,
  timeAgo,
} from "../../utils/object.utils";
import {
  ApplicationStatus,
  DealStatus,
  FileType,
} from "../../enums/types.enum";
import {
  addCommentOnDeal,
  getDealDetail,
  requestSyndication,
  signOff,
  syndicateApprove,
} from "../../apis/deal.api";
import UploadIcon from "../../ts-icons/uploadIcon.svg";
import BinIcon from "../../ts-icons/binIcon.svg";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import { fileSize } from "../../utils/files.utils";
import InvitesListing from "./InvitesListing";
import { RoutesEnums } from "../../enums/routes.enum";
import InvestmentCalculator from "./InvestmentCalculator";
import DealActivity from "./DealActivity";
import { getDownloadDocument, investSyndicate } from "../../apis/syndicate.api";
import Investors from "./DealInvestors";
import { set } from "react-hook-form";

const PropertyOwnerCase = ({
  dealToken,
  dealDetail,
  dealDocs,
  returnPath,
}: any) => {
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const [files, setFiles]: any = useState([]);

  const [deal, setdeal]: any = useState(dealDetail);
  const [modalOpenSyndication, setModalOpenSyndication]: any = useState(null);
  const [selectedDocs, setSelectedDocs]: any = useState(dealDocs);
  const [loading, setLoading]: any = useState(false);
  const [modalOpen, setModalOpen]: any = useState(null);
  const [modalOpen2, setModalOpen2]: any = useState(null);
  const [modalOpen3, setModalOpen3]: any = useState(null);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const [invited, setInvited]: any = useState();
  const [modalOpenComment, setmodalOpenComment]: any = useState(null);
  const [disableUpload, setdisableUpload]: any = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [investmentAmount, setAmount] = useState<number>();

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event: any) => {
    setSelectedCurrency(event.target.value);
  };

  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });

  useLayoutEffect(() => {
    onGetdeal();
  }, [deal?.id]);

  const [bgDark, setBgDark] = useState(false);
  const updateBg = (newBg: any) => {
    setBgDark(newBg);
  };

  useEffect(() => {
    deal && (deal?.invite ? setInvited(true) : setInvited(false));
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    setFileInformation(file);
    e.target.value = "";
  };

  const setFileInformation = async (file: File) => {
    let size = fileSize(file.size, "mb");
    let type;
    setLoading(true);
    if (file.type.includes("video")) type = FileType.VIDEO;
    else if (file.type.includes("image")) {
      type = FileType.IMAGE;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: any = new Image();
        img.src = reader.result;
      };
    } else {
      type = FileType.PDF;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    /* const fileData: any = await handleFileRead(file); */
    doUploadUtil(file, size, type);
    setLoading(false);
  };
  const onDownloadDocument = async (documentID: any, authToken: any) => {
    try {
      setLoading(true);
      let { status, data } = await getDownloadDocument(documentID, authToken);
      if (status === 200) {
        window.open(data?.status?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };
  const onGetdeal = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealDetail(dealToken, authToken);
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
      let allFiles = files.map((file: any) => file.file);
      const formData = new FormData();
      formData.append("invite[status]", "accepted");
      for (let i = 0; i < allFiles.length; i++) {
        const element = allFiles[i];
        formData.append(
          `invite[deal_attachments][${i}]file`,
          element,
          element?.name
        );
        formData.append(
          `invite[deal_attachments][${i}]attachment_kind`,
          element?.type.includes("image") ? "image" : "pdf"
        );
        formData.append(`invite[deal_attachments][${i}]name`, element?.name);
      }
      let { status, data } = await syndicateApprove(
        formData,
        deal?.id,
        deal?.invite?.id,
        authToken
      );
      if (status === 200) {
        toast.success(
          language?.v3?.syndicate?.congrats_deal_approval,
          toastUtil
        );
        setModalOpen3(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onGetdeal();
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const syndicationRequest = async () => {
    try {
      let allFiles = files.map((file: any) => file.file);
      const formData = new FormData();
      formData.append("invite[status]", "accepted");
      for (let i = 0; i < allFiles.length; i++) {
        const element = allFiles[i];
        formData.append(
          `invite[deal_attachments][${i}]file`,
          element,
          element?.name
        );
        formData.append(
          `invite[deal_attachments][${i}]attachment_kind`,
          element?.type.includes("image") ? "image" : "pdf"
        );
        formData.append(`invite[deal_attachments][${i}]name`, element?.name);
      }
      let { status, data } = await requestSyndication(
        formData,
        deal?.id,
        authToken
      );
      if (status === 200) {
        toast.success(
          language?.v3?.syndicate?.congrats_deal_approval,
          toastUtil
        );
        setModalOpen3(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onGetdeal();
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const handleButtonClick = () => {
    const galleryWindow = window.open("", "_blank");
    if (galleryWindow) {
      galleryWindow.document.write(
        "<html><head><title>Images</title></head><body>"
      );
      deal?.docs?.forEach((doc: any, index: number) => {
        galleryWindow.document.write(
          `<img style="margin: 10px; border: 1px solid black;" src="${
            doc.url
          }" alt="Image ${index + 1}" />`
        );
      });

      galleryWindow.document.write("</body></html>");
      galleryWindow.document.close();
    }
  };

  const onRequestChange = async () => {
    try {
      setLoading(true);
      let payload = {
        message: changes.comment,
        invite_id: deal?.invite?.id,
      };
      let { status, data } = await addCommentOnDeal(
        Number(deal?.id),
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
      onGetdeal();
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
        thread_id: deal?.comments[0]?.id,
      };
      let { status, data } = await addCommentOnDeal(
        Number(deal?.id),
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
      onGetdeal();
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const syndicateInvestment = async () => {
    try {
      setLoading(true);
      const { status } = await investSyndicate(
        dealDetail?.id,
        {
          investment: {
            amount: investmentAmount,
          },
        },
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.syndicate?.invested, toastUtil);
      }
    } catch (error: any) {
      if (error?.response?.status === 400)
        toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      onGetdeal();
      setLoading(false);
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
                {language?.v3?.table?.sellingPrice}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                AED {comaFormattedNumber(deal?.selling_price)}
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
                {language?.v3?.deal?.expected_dividend_yield}
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
                {language?.v3?.deal?.expected_annual_return}
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
                {language?.v3?.deal?.por_2}
              </h3>
              <p className="text-neutral-900 font-normal text-sm capitalize">
                AED {comaFormattedNumber(deal?.features?.rental_amount)} (
                {deal?.features?.rental_period})
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <main className="h-full max-h-full overflow-y-hidden">
      {bgDark && (
        <div
          className="absolute inset-0 bg-black opacity-50 rounded-md"
          style={{
            zIndex: 1, // Ensure the overlay is on top of the content
          }}
        />
      )}
      <section>
        <Header
          onSuperLogout={(e: boolean) => {
            setLoading(e);
          }}
        />
      </section>
      <aside
        className="w-full h-full flex items-start justify-start"
        style={{ height: "calc(100% - 70px)" }}
      >
        {user.type?.toLowerCase() === "investor" ? (
          <Sidebar type={KanzRoles.INVESTOR} />
        ) : (
          <Sidebar type={KanzRoles.SYNDICATE} />
        )}
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className="bg-cbc-auth h-full pt-[5rem] px-[5rem] flex items-start overflow-y-auto"
            style={{ width: "calc(100% - 250px)" }}
          >
            {/* Section Left */}
            <section className="w-[60%]">
              <div
                className="w-full inline-flex pb-4 items-center gap-2 relative top-[-25px] cursor-pointer border-b-[1px] border-b-neutral-200"
                onClick={() =>
                  user.type === KanzRoles.INVESTOR
                    ? navigate(RoutesEnums.INVESTOR_DEALS)
                    : navigate(returnPath)
                }
              >
                 <Chevrond
                    className={`${
                      orientation === "rtl"
                        ? "rotate-[-90deg]"
                        : "rotate-[90deg]"
                    } w-4 h-4`}
                    strokeWidth={2}
                    stroke={"#000"}
                  />
                <small className="text-neutral-500 text-sm font-medium">
                  {language?.v3?.common?.investments}
                </small>
              </div>
              <div className="inline-flex justify-between w-full mb-4">
                <h1 className="text-black font-medium text-2xl">
                  {deal?.title}
                </h1>
                <Button
                  type="outlined"
                  className="!cursor-default !hover:border-none"
                >
                  {comaFormattedNumber(deal?.size)}&nbsp;SQFT
                </Button>
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
                          className="w-full h-[48%] border-[1px] border-neutral-200  shadow-cs-1 rounded-[8px]"
                        ></embed>
                      ) : (
                        <img
                          src={deal?.docs[1]?.url}
                          alt={deal?.docs[1]?.name}
                          className="w-full h-[48%] border-[1px] shadow-cs-1  border-neutral-200 rounded-[8px] object-contain bg-white"
                        />
                      )}
                      {deal?.docs[2]?.attachment_kind === FileType.PDF ? (
                        <embed
                          src={deal?.docs[2]?.url}
                          className="w-full h-[48%] border-[1px] border-neutral-200 shadow-cs-1 rounded-[8px] object-contain bg-white"
                        ></embed>
                      ) : (
                        <img
                          src={deal?.docs[2]?.url}
                          alt={deal?.docs[2]?.name}
                          className="w-full h-[48%] border-[1px] border-neutral-200 shadow-cs-1 rounded-[8px] object-contain bg-white"
                        />
                      )}
                    </div>
                  </aside>
                  <Button
                    onClick={handleButtonClick}
                    prefix={<img src={ImgSVG} />}
                    className="absolute right-2 bottom-2 !py-1 bg-white border-[1px] border-gray-900 !text-gray-900 hover:!bg-white !font-normal"
                  >
                    {language.v3.deal.view_all_photos}
                  </Button>
                </section>
              )}
              <aside className="border-[1px] border-neutral-200 rounded-md w-full px-3 py-5 mt-5 flex gap-4 justify-between">
                {deal?.features?.bedrooms && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {language?.v3?.deal?.beds}
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
                      {language?.v3?.deal?.kitchen}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={ChefSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {deal?.features?.kitchen}
                      </small>
                    </span>
                  </section>
                )}
                {deal?.features?.washrooms && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {language?.v3?.deal?.washroom}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={TubSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {deal?.features?.washroom}
                      </small>
                    </span>
                  </section>
                )}
                {deal?.features?.parking_space && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {language?.v3?.deal?.parking}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={CarSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {" "}
                        {deal?.features?.parking_space}
                      </small>
                    </span>
                  </section>
                )}
                {deal?.features?.swimming_pool && (
                  <section className="inline-flex flex-col items-start justify-start">
                    <small className="text-neutral-500 text-sm font-medium mb-2">
                      {language?.v3?.deal?.swim}
                    </small>
                    <span className="inline-flex items-center gap-2">
                      <img src={SwimSVG} alt="Kitchen" />
                      <small className="text-black font-semibold">
                        {deal?.features?.swimming_pool}
                      </small>
                    </span>
                  </section>
                )}
              </aside>
              <section className="mt-10 rounded-md px-5 py-3 mb-6">
                {React.Children.toArray(
                  deal?.unique_selling_points?.map((usp: any) => {
                    return (
                      <div className="mb-4">
                        <div className="bg-cyan-800 rounded-full h-10 w-10 overflow-hidden inline-grid place-items-center inline-block align-top ml-4 mr-4">
                          <img src={BagSVG} alt="Bag" />
                        </div>
                        <div className="inline-block w-[80%] align-top">
                          <div className="font-bold text-neutral-900 text-sm mb-2">
                            {usp?.title}
                          </div>
                          <small className="text-neutral-700 font-normal text-sm block w-full">
                            {usp?.description}
                          </small>
                        </div>
                      </div>
                    );
                  })
                )}
              </section>
              {deal?.status === DealStatus.LIVE && !deal?.is_invested && (
                <>
                  {(user.type === KanzRoles.INVESTOR ||
                    user.type === KanzRoles.SYNDICATE) && (
                    <InvestmentCalculator />
                  )}

                  <section className="mb-4 mt-10">
                    <div className="border-neutral-500 border-[1px] rounded-md min-w-full px-2 justify-between flex bg-white">
                      <label className="w-full">
                        <input
                          className="min-w-full h-9 no-spin-button"
                          pattern="[0-9]*"
                          placeholder={
                            selectedCurrency === "USD" ? "$ 0.00" : "AED 0.00"
                          }
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          min="0"
                          type="number"
                          value={investmentAmount}
                          onChange={handleAmountChange}
                        />
                      </label>
                      <label className="w-[10%]">
                        <select
                          className="h-9"
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                        >
                          <option className="text-md font-light" value="USD">
                            USD
                          </option>
                          <option className="text-md font-light" value="AED">
                            AED
                          </option>
                        </select>
                      </label>
                    </div>

                    <div className="mt-3">
                      <Button
                        disabled={
                          investmentAmount === undefined || investmentAmount < 1
                        }
                        onClick={() => {
                          syndicateInvestment();
                        }}
                        className="w-full"
                      >
                        {language?.v3?.syndicate?.invest_now}
                      </Button>
                    </div>
                  </section>
                </>
              )}

              <section className="mt-10 ">
                <h1 className="text-black font-medium text-2xl mb-3">
                  {language?.v3?.deal?.about_prop}
                </h1>
                <p className="text-sm text-neutral-500 font-medium">
                  {deal?.description}
                </p>
              </section>
              <section>
                <div className="inline-flex justify-between w-full flex-col my-10">
                  <h1 className="text-black font-medium text-2xl mb-3">
                    {language?.v3?.common?.risk_disc}
                  </h1>
                  <p
                    className="font-medium"
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading1}
                  </p>
                  <ul className=" list-disc pl-6 text-sm">
                    <li>{" " + language?.v3?.dealOverview?.h1bullet1}</li>
                    <li>{" " + language?.v3?.dealOverview?.h1bullet2}</li>
                    <li>{" " + language?.v3?.dealOverview?.h1bullet3}</li>
                  </ul>
                  <p
                    className="font-medium"
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading2}
                  </p>
                  <ul className=" list-disc pl-6 text-sm">
                    <li>{" " + language?.v3?.dealOverview?.h2bullet1}</li>
                    <li>{" " + language?.v3?.dealOverview?.h2bullet2}</li>
                    <li>{" " + language?.v3?.dealOverview?.h1bullet3}</li>
                  </ul>
                  <p
                    className="font-medium"
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading3}
                  </p>
                  <ul className=" list-disc pl-6 text-sm">
                    <li>{" " + language?.v3?.dealOverview?.h3bullet1}</li>
                    <li>{" " + language?.v3?.dealOverview?.h3bullet2}</li>
                    <li>{" " + language?.v3?.dealOverview?.h3bullet3}</li>
                  </ul>
                </div>
              </section>
              {user.type.toLowerCase() === "syndicate" &&
                deal?.status !== DealStatus.LIVE && (
                  <div className="w-full inline-flex justify-end gap-4 mb-3">
                    {deal?.invite?.status !== DealStatus.ACCEPTED && (
                      <div className="w-full">
                        {deal?.invite ? (
                          <Button
                            className="w-full"
                            onClick={() => setModalOpen2(true)}
                          >
                            {language?.v3?.button?.interested}
                          </Button>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => setModalOpenSyndication(true)}
                          >
                            {language?.v3?.syndicate?.req_syndication}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
            </section>
            {/* Invisible Section */}
            <section className="w-[10%]"></section>

            {/* Section Right */}
            <section className="w-[30%]">
              {/* Show/Hide based on some conditions */}
              {user.type.toLowerCase() === "syndicate" &&
                deal?.status === DealStatus.LIVE &&
                deal?.current_deal_syndicate && (
                  <div className="w-full inline-flex justify-end gap-4">
                    <div className="relative z-10">
                      <InvitesListing
                        approve={deal?.status}
                        dealId={dealToken}
                        type={KanzRoles.SYNDICATE}
                        dealIdReal={deal?.id}
                        updateBg={updateBg}
                      />
                    </div>
                  </div>
                )}
              {user.type.toLowerCase() === "syndicate" &&
                deal?.status !== DealStatus.LIVE && (
                  <div className="w-full inline-flex justify-end gap-4">
                    {deal?.invite?.status !== DealStatus.ACCEPTED && (
                      <React.Fragment>
                        {deal?.invite ? (
                          <>
                            <Button
                              type="outlined"
                              onClick={() => setModalOpen(true)}
                            >
                              {language?.v3?.button?.req_change}
                            </Button>
                            <Button onClick={() => setModalOpen2(true)}>
                              {language?.v3?.button?.interested}
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setModalOpenSyndication(true)}>
                            {language?.v3?.syndicate?.req_syndication}
                          </Button>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                )}
              <aside className="border-[1px] border-neutral-200 rounded-md w-full px-3 pt-3 mt-5 bg-white">
                <h2 className="text-neutral-700 text-xl font-medium">
                  {language?.v3?.common?.invest_details}
                </h2>
                <small className="text-neutral-500 text-sm font-normal">
                  {language?.v3?.common?.end_on} {deal?.end_at}
                </small>

                {deal?.status === DealStatus.LIVE && !deal?.is_invested && (
                  <section className="mb-4 mt-1">
                    <div className="border-neutral-500 border-[1px] rounded-md min-w-full px-2 pr-10 justify-between flex bg-white">
                      <label className="w-full">
                        <input
                          className="min-w-full h-9 no-spin-button"
                          pattern="[0-9]*"
                          placeholder={
                            selectedCurrency === "USD" ? "$ 0.00" : "AED 0.00"
                          }
                          onKeyDown={(evt) =>
                            ["e", "E", "+", "-"].includes(evt.key) &&
                            evt.preventDefault()
                          }
                          min="0"
                          type="number"
                          value={investmentAmount}
                          onChange={handleAmountChange}
                        />
                      </label>
                      <label className="w-[10%]">
                        <select
                          className="h-9"
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                        >
                          <option className="text-md font-light" value="USD">
                            USD
                          </option>
                          <option className="text-md font-light" value="AED">
                            AED
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="mt-4">
                      <Button
                        disabled={
                          investmentAmount === undefined || investmentAmount < 1
                        }
                        onClick={() => {
                          syndicateInvestment();
                        }}
                        className="w-full"
                      >
                        {language?.v3?.syndicate?.invest_now}
                      </Button>
                    </div>
                  </section>
                )}

                {getRoleBasedUI()}
              </aside>
              {deal?.is_invested && (
                <div className="">
                  <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-white items-center gap-3">
                    <div className="rounded-md text-md font-semibold inline-grid place-items-center">
                      {language?.v3?.syndicate?.your_commitment}
                    </div>
                    <div className="rounded-md text-xs inline-grid place-items-center">
                      {language?.v3?.syndicate?.not_able_to_rev}
                    </div>
                    <aside className="border-t-[2px] border-neutral-200  w-full p-3 mt-5 inline-flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-cbc-grey-sec inline-grid place-items-center">
                        <img src={CurrencySVG} alt="Currency" />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h2 className="text-neutral-900 font-normal text-sm">
                            {"Commitment"}
                          </h2>
                          <p className="text-black font-medium text-lg">
                            AED {comaFormattedNumber(deal?.my_invested_amount)}
                          </p>
                        </div>
                        <div>
                          <Button
                            onClick={() => {}}
                            className="!py-1 !px-2 !font-medium !rounded-full border-[1px] border-black !text-xs"
                            type="outlined"
                          >
                            {language?.v3?.syndicate?.reverse}
                          </Button>
                        </div>
                      </div>
                    </aside>
                  </aside>
                </div>
              )}

              <div className="">
                <aside className="border-[1px] border-neutral-200 rounded-md w-full bg-white p-3 mt-5 inline-flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-cbc-grey-sec inline-grid place-items-center">
                    <img src={CurrencySVG} alt="Currency" />
                  </div>

                  <div>
                    <h2 className="text-neutral-900 font-normal text-sm">
                      {language?.v3?.common?.am_raised}
                    </h2>
                    <p className="text-black font-medium text-lg">
                      AED {comaFormattedNumber(deal?.raised)}
                    </p>
                  </div>
                </aside>
              </div>

              {deal?.docs?.length && (
                <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 bg-cbc-check max-h-[400px] overflow-y-auto custom-scroll mb-4">
                  {React.Children.toArray(
                    deal?.docs?.map((doc: any) => {
                      return (
                        <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200 mb-2">
                          <span className="inline-flex items-center w-[80%]">
                            <div
                              onClick={() => {
                                window.open(doc?.url, "_blank");
                              }}
                              className="bg-white  h-14 inline-flex justify-center flex-col  cursor-pointer w-full"
                            >
                              <h4
                                className="text-md font-medium  max-w-full truncate"
                                title={doc?.name}
                              >
                                {doc?.name}
                              </h4>
                              <h2 className="inline-flex items-center text-sm  gap-1 max-w-[200px] ">
                                <div className="text-xs text-black text-neutral-500 font-medium ">
                                  {language?.v3?.button?.view}
                                </div>
                                <ArrowIcon stroke="#000" />
                              </h2>
                            </div>
                          </span>

                          <div
                            className="h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200"
                            onClick={() => {
                              onDownloadDocument(doc?.id, authToken);
                            }}
                          >
                            <DownloadIcon />
                          </div>
                        </section>
                      );
                    })
                  )}
                </aside>
              )}
              {deal?.external_links && (
                <aside className="mt-5">
                  {" "}
                  <h2 className="text-neutral-700 text-xl pb-2 font-medium">
                    {language?.v3?.deal?.prop_links}
                  </h2>
                  <div className="inline-flex flex-col justify-between h-full w-full overflow-hidden">
                    {React.Children.toArray(
                      deal?.external_links?.map((link: any) => {
                        return (
                          <section className="rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200 mb-2">
                            <span className="inline-flex items-center w-full justify-between">
                              <div className="bg-white h-8 inline-flex justify-center flex-col w-[80%]">
                                <h2
                                  className="text-sm font-medium text-neutral-500 max-w-full truncate"
                                  title={link}
                                >
                                  {link}
                                </h2>
                              </div>
                              <img
                                src={ExternalSvg}
                                alt={link}
                                className="cursor-pointer"
                                onClick={() => {
                                  let externallink = link.includes("http")
                                    ? link
                                    : `https://${link}`;
                                  window.open(externallink, "_blank");
                                }}
                              />
                            </span>
                          </section>
                        );
                      })
                    )}
                  </div>
                </aside>
              )}

              {deal?.comments?.length && (
                <aside className="mt-4">
                  <div className="justify-between mb-4 w-full border-[1px]  rounded-md border-b-neutral-200 bg-white ">
                    <div className="inline-flex justify-between items-center w-full border-b-[1px] border-b-neutral-200">
                      <div className="pb-1 m-4  text-lg font-bold   ">
                        {language?.v3?.syndicate?.comments}
                      </div>
                      <Button
                        className="mr-4"
                        onClick={() => setmodalOpenComment(true)}
                        type="outlined"
                      >
                        {language?.v3?.syndicate?.add_reply}
                      </Button>
                    </div>

                    <p className=" overflow-auto custom-scroll rounded-md  w-full opacity-80 max-h-56 text-neutral-700 font-normal text-sm text-justify">
                      {React.Children.toArray(
                        deal?.comments?.map((comments: any) => (
                          <div className="p-2 pt-3 border-b-[1px] border-neutral-300 overflow-hidden  font-medium  w-full items-center justify-between">
                            <div className=" pl-2 inline-flex items-start">
                              <img
                                className="h-7 w-7 rounded-full"
                                src={
                                  "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                }
                                alt="Author Logo"
                              />
                              <span className="ml-2 mr-4">
                                <h1 className="font-medium capitalize text-lg">
                                  {comments?.author_id === user?.id
                                    ? language?.v3?.syndicate?.you
                                    : comments?.author_name}
                                  <span className="text-xs font-neutral-700 ml-5 font-normal">
                                    {timeAgo(comments?.created_at)}
                                  </span>
                                </h1>
                                <p className="pt-0 pb-1 overflow-y-auto custom-scroll font-nromal text-sm text-neutral-700">
                                  {comments?.message}
                                </p>
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </p>
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
                {language?.v3?.syndicate?.req_changes}
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
                  {language?.v3?.syndicate?.add_comment}
                </label>
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder={language?.v3?.syndicate?.add_comment}
                  className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 w-full">
              <Button
                disabled={!changes.comment}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => {
                  onRequestChange();
                  setModalOpen(false);
                }}
              >
                {language.buttons.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpenComment ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[400px] rounded-md h-full">
            <section className="py-3 px-4">
              <header className="h-16 py-2 px-3 inline-flex w-full justify-between items-center">
                <h3 className="text-xl font-medium text-neutral-700">Reply</h3>
                <div
                  className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer"
                  onClick={() => {
                    setmodalOpenComment(false);
                    setChanges({ comment: "", action: "", document: null });
                    // setFiles([]);
                  }}
                >
                  <CrossIcon stroke="#000" />
                </div>
              </header>
              <div className="mb-6">
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder={language?.v3?.syndicate?.add_reply}
                  className=" h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 w-full">
              <Button
                disabled={!changes.comment}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => {
                  onAddCommentOnDeal();
                  setmodalOpenComment(false);
                }}
              >
                {language?.v3?.syndicate?.reply}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpen2 ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[400px] rounded-md h-full">
            <section className="py-3 px-1">
              <header className=" px-1 inline-flex w-full justify-end items-center">
                <div
                  className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer"
                  onClick={() => {
                    setModalOpen2(false);
                    setChanges({ comment: "", action: "", document: null });
                    // setFiles([]);
                  }}
                >
                  <CrossIcon stroke="#000" />
                </div>
              </header>
              <div className="mb-6 pt-5 text-center">
                <label
                  htmlFor=""
                  className="text-neutral-900 text-center font-bold text-xl"
                >
                  {language?.v3?.syndicate?.deal_approved_by_you}
                </label>
                <p className="pt-5">
                  {language?.v3?.syndicate?.deal_approved_para}
                </p>
              </div>
            </section>

            <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 w-full">
              <Button
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-6/12"
                onClick={() => {
                  setModalOpen2(false);
                  setModalOpen3(true);
                }}
              >
                {language?.v3?.syndicate?.continue}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpenSyndication ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[400px] rounded-md h-full">
            <section className="py-3 px-10">
              <div className="mb-6 pt-5 text-center">
                <label
                  htmlFor=""
                  className="text-neutral-900 text-center font-bold text-xl"
                >
                  {language?.v3?.syndicate?.req_for_syndication}
                </label>
                <p className="pt-5">
                {language?.v3?.syndicate?.req_changes_para}

                </p>
              </div>
            </section>

            <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 w-full">
              <Button
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-6/12"
                onClick={() => {
                  setModalOpenSyndication(false);
                  setModalOpen3(true);
                }}
              >
                                {language?.v3?.syndicate?.continue}

              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpen3 ? true : false} className="w-full">
        <div
          className="rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.078" }}
        >
          <aside className="bg-white w-[400px] rounded-md h-full">
            <header className="bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center">
              <h3 className="text-xl font-medium text-neutral-700">
              {language?.v3?.syndicate?.deal_approval}

              </h3>
              <div
                className="bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer"
                onClick={() => {
                  setModalOpen3(false);
                  setChanges({ comment: "", action: "", document: null });
                  // setFiles([]);
                }}
              >
                <CrossIcon stroke="#000" />
              </div>
            </header>

            <section className="py-3 px-4">
              <div className="mb-3 w-full">
                <span className="w-full">
                  <button
                    className="bg-cbc-grey-sec rounded-lg inline-flex justify-center gap-2 px-4 py-2 w-full"
                    onClick={() => {
                      let elem: any =
                        document.getElementById("doc_deal_uploader");
                      elem.click();
                    }}
                  >
                    <UploadIcon />
                    <small className="text-cyan-800 text-sm font-medium">
                    {language?.v3?.syndicate?.upload_a_doc}

                    </small>
                  </button>
                  <input
                    type="file"
                    className="hidden"
                    id="doc_deal_uploader"
                    multiple={true}
                    onChange={handleFileUpload}
                  />
                </span>
              </div>
              <div className="mb-3 w-full">
                {React.Children.toArray(
                  files?.map((doc: any) => {
                    return (
                      <section className="rounded-md bg-cbc-grey-sec px-1 py-2 inline-flex items-center justify-between border-[1px] border-neutral-200 w-full">
                        <span className="inline-flex items-center">
                          <div className="rounded-[7px] bg-white shadow shadow-cs-3 w-14 h-14 inline-grid place-items-center">
                            <img src={FileSVG} alt="File" />
                          </div>
                          <span className="inline-flex flex-col items-start ml-3">
                            <h2
                              className="text-sm font-medium text-neutral-900 max-w-[150px] truncate"
                              title={doc?.file?.name}
                            >
                              {doc?.file?.name}
                            </h2>
                          </span>
                        </span>

                        <small>{doc?.size} MB</small>
                        <div
                          className="rounded-lg w-8 h-8 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer"
                          onClick={() => {
                            setFiles((pr: any) => {
                              let files = pr.filter(
                                (p: any) => p.id !== doc.id
                              );
                              return files;
                            });
                          }}
                        >
                          <BinIcon stroke="#404040" />
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
            </section>

            <footer className="w-full inline-flex justify-between gap-3 py-2 px-3 w-full">
              <Button
                disabled={disableUpload}
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => {
                  setdisableUpload(true);
                  invited ? postSignOff() : syndicationRequest();
                }}
              >
                {language.buttons.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <svg id="svg-filter">
        <filter id="svg-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
        </filter>
      </svg>
    </main>
  );
};
export default PropertyOwnerCase;
