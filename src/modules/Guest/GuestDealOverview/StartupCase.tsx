import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../../enums/roles.enum";

import Header from "../../../shared/components/Header";

import Chevrond from "../../ts-icons/chevrond.svg";

import ArrowIcon from "../../ts-icons/arrowIcon.svg";
import DownloadIcon from "../../../ts-icons/downloadIcon.svg";

import CrossIcon from "../../ts-icons/crossIcon.svg";
import FileSVG from "../../assets/svg/file.svg";
import Zoomin from "../../ts-icons/zoominIcon.svg";
import Zoomout from "../../ts-icons/ZoomoutIcon.svg";
import CurrencySVG from "../../../assets/svg/currency.svg";

import {
  comaFormattedNumber,
  formatDate,
  numberFormatter,
  timeAgo,
} from "../../../utils/object.utils";
import {
  ApplicationStatus,
  DealStatus,
  FileType,
} from "../../../enums/types.enum";
import {
  addCommentOnDeal,
  getDealDetail,
  signOff,
  syndicateApprove,
} from "../../../apis/deal.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import UploadIcon from "../../ts-icons/uploadIcon.svg";
import BinIcon from "../../ts-icons/binIcon.svg";
import { fileSize, handleFileRead } from "../../../utils/files.utils";
import { RoutesEnums } from "../../../enums/routes.enum";
import { RootState } from "../../../redux-toolkit/store/store";

const CURRENCIES = ["USD", "AED"];

const StartupCase = ({ id, dealToken }: any) => {
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const [files, setFiles]: any = useState([]);
  const [currency, setCurrency] = useState(0);
  const [deal, setdeal]: any = useState([]);
  const [selectedDocs, setSelectedDocs]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [fileLoading, setFileLoading]: any = useState(false);
  const [modalOpen, setModalOpen]: any = useState(null);
  const [modalOpen2, setModalOpen2]: any = useState(null);
  const [modalOpen3, setModalOpen3]: any = useState(null);
  const [disableUpload, setdisableUpload]: any = useState(false);
  const [modalOpenComment, setmodalOpenComment]: any = useState(null);

  const [amount, setAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

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

  useEffect(() => {
    onGetdeal();
  }, []);
 




  const numberInputUI = () => {
    let placeholder = currency === 0 ? "$ 0.00" : "0.00 د.إ";

    return (
      <section className="flex items-start justify-center flex-col mt-3 w-full">
        <section className="mb-2 w-full relative">
          <div className="relative rounded-md w-full h-10 border-[1px] border-neutral-300 bg-white overflow-hidden inline-flex items-center px-3">
            <input
              value={comaFormattedNumber("")}
              onInput={(e: any) => {
                const enteredValue = e.target.value;
                const numericValue = enteredValue.replace(
                  /[^0-9.]|(\.(?=.*\.))/g,
                  ""
                );
              }}
              placeholder={placeholder}
              type="text"
              className="outline-none w-full h-full placeholder-neutral-500"
            />
            <span
              className="cursor-pointer inline-flex items-center"
              onClick={() =>
                setCurrency((prev) => {
                  return prev === 0 ? 1 : 0;
                })
              }
            >
              <button className="font-normal text-lg text-neutral-500">
                {CURRENCIES[currency]}
              </button>
            </span>
          </div>
        </section>
      </section>
    );
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
          {language?.v3?.deal?.instrument_type}
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
        toast.success("Congratulations! Deal Approved", toastUtil);
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

  const onTo = (type: string) => {
    setFileLoading(true);
    let idx: number = deal?.docs?.findIndex(
      (f: any) => f.id === selectedDocs?.id
    );
    if (type === "++" && idx < deal?.docs?.length - 1)
      setSelectedDocs(deal?.docs[idx + 1]);
    else if (type === "--" && idx > 0) setSelectedDocs(deal?.docs[idx - 1]);

    let timer = setTimeout(() => {
      clearTimeout(timer);
      setFileLoading(false);
    }, 500);
  };

  return (
    <main className="h-full max-h-full overflow-y-hidden">
       
      <section>
        <Header />
      </section>
      <aside
        className="w-full flex items-start justify-start"
        style={{ height: "calc(100% - 70px)" }}
      >
       
        
        {loading ? (
          <div
            className="absolute left-0 top-0 w-full h-full grid place-items-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)", zIndex: 50 }}
          >
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
                onClick={() => user.type === "Investor" ? navigate(RoutesEnums.INVESTOR_DASHBOARD):navigate(RoutesEnums.SYNDICATE_DASHBOARD) }
              >
                <small className="text-neutral-500 text-sm font-medium">
                  {language?.v3?.common?.investments}
                </small>
              </div>
              <div className="w-full inline-flex flex-col pb-8 items-start gap-2">
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
              </div>
              {/* If Image or PDF */}
              {selectedDocs?.attachment_kind === FileType.IMAGE ? (
                <section className="h-[500px] rounded-[8px] overflow-hidden border-[1px] border-neutral-200 relative">
                  <div className="bg-white w-full h-16 inline-flex items-center px-4 border-b-[1px] border-b-neutral-200">

                    <hr className="w-[1px] h-full bg-neutral-200" />
                   

                    <hr className="w-[1px] h-full bg-neutral-200" />

                    <hr className="w-[1px] h-full bg-neutral-200" />

                    <hr className="w-[1px] h-full bg-neutral-200" />
                  </div>
                  <aside
                    className="w-full overflow-y-auto bg-cbc-grey-sec p-4"
                    style={{ height: "calc(100% - 60px)" }}
                  >
                    {fileLoading ? (
                      <div
                        className="absolute left-0 top-0 w-full h-full grid place-items-center"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          zIndex: 50,
                        }}
                      >
                      </div>
                    ) : (
                      <img
                        src={selectedDocs?.url}
                        alt={selectedDocs?.name}
                        id="deal-file"
                        className="bg-white mx-auto"
                        style={{ maxWidth: "unset", objectFit: "contain" }}
                      />
                    )}
                  </aside>
                </section>
              ) : (
                <section className="w-full h-[500px] rounded-[8px] overflow-hidden border-[1px] border-neutral-200 bg-cbc-grey-sec p-4 relative">
                  <div className="bg-white w-full h-16 inline-flex items-center px-4 border-b-[1px] border-b-neutral-200">
                   

                    <hr className="w-[1px] h-full bg-neutral-200" />
                   

                    <hr className="w-[1px] h-full bg-neutral-200" />
                  </div>
                  {fileLoading ? (
                    <div
                      className="absolute left-0 top-0 w-full h-full grid place-items-center"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        zIndex: 50,
                      }}
                    >
                      
                    </div>
                  ) : (
                    <embed
                      src={selectedDocs?.url}
                      className="w-full h-full"
                      id="deal-file"
                    />
                  )}
                </section>
              )}
              <section className="mb-4 mt-10">
                <div className="font-semibold text-sm">Invest</div>
                <div className=" text-xs  text-neutral-500 mb-2">
                  Minimum is $2500 Invest by Oct 2
                </div>
                <div className="border-neutral-500 border-[1px] rounded-md min-w-full pl-2 justify-between flex bg-white">
                  <label className="w-full">
                    <input
                      className="min-w-full h-9 no-spin-button"
                      pattern="[0-9]*"
                      placeholder={
                        selectedCurrency === "USD" ? "$ 00.00" : "AED 00.00"
                      }
                      onKeyDown={(evt) =>
                        ["e", "E", "+", "-"].includes(evt.key) &&
                        evt.preventDefault()
                      }
                      min="0"
                      type="number"
                      value={amount}
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
              </section>
          
                
            </section>

            {/* Invisible Section */}
            <section className="w-[10%]"></section>

            {/*
            {.......##...............######..########..######..########.####..#######..##....##....########..####..######...##.....##.########....................##
            {......##...##...##.....##....##.##.......##....##....##.....##..##.....##.###...##....##.....##..##..##....##..##.....##....##........##...##.......##.
            {.....##.....##.##......##.......##.......##..........##.....##..##.....##.####..##....##.....##..##..##........##.....##....##.........##.##.......##..
            {....##....#########.....######..######...##..........##.....##..##.....##.##.##.##....########...##..##...####.#########....##.......#########....##...
            {...##.......##.##............##.##.......##..........##.....##..##.....##.##..####....##...##....##..##....##..##.....##....##.........##.##.....##....
            {..##.......##...##.....##....##.##.......##....##....##.....##..##.....##.##...###....##....##...##..##....##..##.....##....##........##...##...##.....
            {.##.....................######..########..######.....##....####..#######..##....##....##.....##.####..######...##.....##....##.................##......
            {*/}
            <section className="w-[30%]">
              {/* Show/Hide based on some conditions */}
        
              <aside className="mx-4">
                <section className="mb-4 mt-10">
                  <div className="font-semibold text-sm">Invest</div>
                  <div className=" text-xs  text-neutral-500 mb-2">
                    Minimum is $2500 Invest by Oct 2
                  </div>
                  <div className="border-neutral-500 border-[1px] rounded-md min-w-full bg-white px-2 justify-between flex">
                    <label className="w-full">
                      <input
                        className="min-w-full h-9 no-spin-button"
                        pattern="[0-9]*"
                        placeholder={
                          selectedCurrency === "USD" ? "$ 00.00" : "AED 00.00"
                        }
                        onKeyDown={(evt) =>
                          ["e", "E", "+", "-"].includes(evt.key) &&
                          evt.preventDefault()
                        }
                        min="0"
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </label>
                    <label>
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
              
                </section>
              </aside>

              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5">
                <h2 className="text-neutral-700 text-xl font-medium">
                  {language?.v3?.common?.invest_details}
                </h2>
                <small className="text-neutral-500 text-sm font-normal">
                  {language?.v3?.common?.end_on} {deal?.end_at}
                </small>

                {getRoleBasedUI()}
              </aside>
              <aside className="border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 inline-flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-cbc-grey-sec inline-grid place-items-center">
                  <img src={CurrencySVG} alt="Currency" />
                </div>

                <div>
                  <h2 className="text-neutral-900 font-normal text-sm">
                    {language?.v3?.common?.am_raised}
                  </h2>
                  <p className="text-black font-medium text-lg">
                    ${numberFormatter(deal?.raised)}
                  </p>
                </div>
              </aside>
              {deal?.docs?.length && (
                <aside className="border-[1px] border-neutral-200 overflow-auto custom-scroll rounded-md w-full p-3 mt-5 bg-cbc-check max-h-[400px] overflow-y-auto no-scrollbar mb-4">
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
              )}

              <aside>
                {deal?.comments?.length && (
                  <div className="justify-between mb-4 w-full border-[1px]  rounded-md border-b-neutral-200 bg-white ">
                    <div className="inline-flex justify-between items-center w-full  border-b-[1px] border-b-neutral-200 ">
                      <div className="pb-1 m-4  text-lg font-bold ">
                        Comments
                      </div>
                   
                    </div>
                    <p className=" overflow-auto custom-scroll rounded-md  w-full opacity-80 max-h-56 text-neutral-700 font-normal text-sm text-justify">
                      {React.Children.toArray(
                        deal?.comments?.map((comments: any) => (
                          <div className=" p-2 pt-3 border-b-[1px] border-neutral-300 overflow-hidden  font-medium  w-full items-center justify-between">
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
                                    ? "You"
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
                )}
              </aside>
            </section>
          </section>
        )}
      </aside>

      
    </main>
  );
};
export default StartupCase;