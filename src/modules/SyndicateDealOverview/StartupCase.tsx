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
import FileSVG from "../../assets/svg/file.svg";
import Zoomin from "../../ts-icons/zoominIcon.svg";
import Zoomout from "../../ts-icons/ZoomoutIcon.svg";
import CurrencySVG from "../../assets/svg/currency.svg";
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
  signOff,
  syndicateApprove,
} from "../../apis/deal.api";
import { toast } from "react-toastify";
import { toastUtil } from "../../utils/toast.utils";
import UploadIcon from "../../ts-icons/uploadIcon.svg";
import BinIcon from "../../ts-icons/binIcon.svg";
import { fileSize, handleFileRead } from "../../utils/files.utils";

const CURRENCIES = ["USD", "AED"];

const StartupCase = ({ id }: any) => {
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
  const [changes, setChanges]: any = useState({
    comment: "",
    action: "",
    document: null,
  });

  useLayoutEffect(() => {
    onGetdeal();
  }, [id]);

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

  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };

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

  const zoomin = () => {
    let imgElem: any = document.getElementById("deal-file");
    let currWidth = imgElem.clientWidth;
    imgElem.style.width = currWidth + 50 + "px";
  };

  const zoomout = () => {
    let imgElem: any = document.getElementById("deal-file");
    let currWidth = imgElem.clientWidth;
    if (currWidth > 150) imgElem.style.width = currWidth - 50 + "px";
  };

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
      onGetdeal();
      setLoading(false);
      setChanges({ comment: "", action: "", document: null });
    }
  };

  const getRoleBasedUI = () => {
    return (
      <React.Fragment>
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
        {deal?.selling_price && (
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
              {formatDate(deal?.start_at) || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.end_at && (
          <div className="w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3">
            <h3 className="text-neutral-900 font-medium text-sm">
              {language?.v3?.deal?.end_at}
            </h3>
            <p className="text-neutral-900 font-normal text-sm capitalize">
              {formatDate(deal?.end_at) || language?.v3?.common?.not_added}
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
              {/* If Image or PDF */}
              {selectedDocs?.attachment_kind === FileType.IMAGE ? (
                <section className="h-[500px] rounded-[8px] overflow-hidden border-[1px] border-neutral-200 relative">
                  <div className="bg-white w-full h-16 inline-flex items-center px-4 border-b-[1px] border-b-neutral-200">
                    <Zoomin onClick={zoomin} className="cursor-pointer mr-3" />

                    <hr className="w-[1px] h-full bg-neutral-200" />
                    <Zoomout
                      onClick={zoomout}
                      className="cursor-pointer mx-3"
                    />

                    <hr className="w-[1px] h-full bg-neutral-200" />
                    <Chevrond
                      onClick={() => onTo("--")}
                      className={`mx-3 h-8 w-8 rotate-90 ${
                        deal?.docs?.length > 1
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      stroke="#404040"
                    />

                    <hr className="w-[1px] h-full bg-neutral-200" />
                    <Chevrond
                      onClick={() => onTo("++")}
                      className={`mx-3 h-8 w-8 rotate-[-90deg] ${
                        deal?.docs?.length > 1
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      stroke="#404040"
                    />

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
                        <Spinner />
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
                    <Chevrond
                      onClick={() => onTo("--")}
                      className={`mr-3 h-8 w-8 rotate-90 ${
                        deal?.docs?.length > 1
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      stroke="#404040"
                    />

                    <hr className="w-[1px] h-full bg-neutral-200" />
                    <Chevrond
                      onClick={() => onTo("++")}
                      className={`mx-3 h-8 w-8 rotate-[-90deg] ${
                        deal?.docs?.length > 1
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      stroke="#404040"
                    />

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
                      <Spinner />
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

              {(deal?.invite?.status !== DealStatus.ACCEPTED ||
                deal?.invite?.status !== "approved") && (
                <Button
                  onClick={() => {
                    setModalOpen2(true);
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
              {(deal?.invite?.status !== DealStatus.ACCEPTED ||
                deal?.invite?.status !== "approved") && (
                <div className="w-full inline-flex justify-end gap-4">
                  <Button type="outlined" onClick={() => setModalOpen(true)}>
                    {language?.v3?.button?.req_change}
                  </Button>
                  <Button
                    onClick={() => {
                      setModalOpen2(true);
                    }}
                  >
                    {language?.v3?.button?.interested}
                  </Button>
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
              <aside>
                {deal?.comments?.length && (
                  <div className="justify-between pb-2 w-full border-[1px]  rounded-md border-b-neutral-200 ">
                    <div className="pb-1 m-4  text-lg font-bold border-b-[1px]  border-b-neutral-200">
                      Comments
                    </div>
                    <p className=" overflow-auto no-scrollbar rounded-md  w-full opacity-80 max-h-56 text-neutral-700 font-normal text-sm text-justify">
                      {React.Children.toArray(
                        deal?.comments?.map((comments: any) => (
                          <div className=" max-h-24 p-2 pt-3  overflow-hidden  font-medium  w-full items-center justify-between">
                            <div className=" pl-2 inline-flex items-start">
                              <img
                                className="h-7 w-7 rounded-full"
                                src={
                                  "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                }
                                alt="Author Logo"
                              />
                              <span className="ml-2">
                                <h1 className="font-medium capitalize text-lg">
                                  {comments?.author_id === user?.id
                                    ? "You"
                                    : comments?.author_name}
                                  <span className="text-xs font-neutral-700 ml-5 font-normal">
                                    {timeAgo(comments?.created_at)}
                                  </span>
                                </h1>
                                <p className="pt-0 font-nromal text-sm text-neutral-700">
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
      <Modal show={modalOpen2 ? true : false} className="w-full">
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
                  Deal Approved by You!
                </label>
                <p className="pt-5">
                  You've successfully approved the deal. Now you can upload the
                  required document. Click “Continue” to upload the documents
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
                Continue
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
                Deal Approval
              </h3>
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
                      Upload a Document
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
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-full"
                onClick={() => postSignOff()}
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
export default StartupCase;
