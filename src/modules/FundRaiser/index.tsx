import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KanzRoles } from "../../enums/roles.enum";
import Header from "../../shared/components/Header";
import Sidebar from "../../shared/components/Sidebar";
import { RootState } from "../../redux-toolkit/store/store";
import SearchIcon from "../../ts-icons/searchIcon.svg";
import Spinner from "../../shared/components/Spinner";
import Button from "../../shared/components/Button";
import Table from "../../shared/components/Table";
import { RoutesEnums, StartupRoutes } from "../../enums/routes.enum";
import Modal from "../../shared/components/Modal";
import CrossIcon from "../../ts-icons/crossIcon.svg";
import DealTable from "../../shared/components/DealTable";
import { saveDataHolder } from "../../redux-toolkit/slicer/dataHolder.slicer";
import { getDeals } from "../../apis/deal.api";
import { numberFormatter } from "../../utils/object.utils";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { ApplicationStatus } from "../../enums/types.enum";
import Chevrond from "../../ts-icons/chevrond.svg";
import EditIcon from "../../ts-icons/editIcon.svg";
import CustomStatus from "../../shared/components/CustomStatus";
import SelectDealTypeModal from "./SelectDealTypeModal";
import { saveUserData } from "../../redux-toolkit/slicer/user.slicer";
import { saveUserMetaData } from "../../redux-toolkit/slicer/metadata.slicer";

const FundRaiser = ({}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const columns = [
    language?.v3?.table?.title,
    language?.v3?.table?.type,
    language?.v3?.table?.status,
    language?.v3?.table?.stage,
    language?.v3?.table?.round,
    language?.v3?.table?.target,
    language?.v3?.table?.action,
  ];
  const [pagination, setPagination] = useState({
    items_per_page: 10,
    total_items: [],
    current_page: 1,
    total_pages: 0,
  });
  const metadata: any = useSelector((state: RootState) => state.metadata);
  const [filter, setFilterCounts]:any = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [modalOpen, setModalOpen]: any = useState(null);
  const [warningModal, setwarningModal]: any = useState(null);
  const [selectTypeModal, setSelectTypeModal]: any = useState(null);
  const [dealTypeCheck,setDealTypeCheck]:any = useState("")
  const [loading, setLoading] = useState(false);
  const [tabs] = useState([
    language?.v3?.startup?.overview?.all,
    "Draft",
    "Reopened",
    "Submitted",
    "Approved",
    "Live",
    "Verified",
    "Rejected"
  ]);
  const getCountvalue = ( value:string ) =>
  { 
    let count = 0 ;
    switch (value) {
      case  "All" : 
      count = filter?.all
      break
      case  "Draft" : 
      count = filter?.draft
      break
      case  "Reopened" : 
      count = filter?.reopened
      break
      case  "Submitted" : 
      count = filter?.submitted
      break
      case  "Approved" : 
      count = filter?.approved
      break
      case  "Live" : 
      count = filter?.live
      break
      case  "Verified" : 
      count = filter?.verified
      break
      case  "Rejected" : 
      count = filter?.rejected
      break
    } 

    return count
    
  }
  const [deals, setDeals]:any = useState([]);
  const [dealId, setDealId]:any = useState(null);
  const [dealStep, setDealStep]:any = useState(null);
  const [searchQuery, setSearchQuery]: any = useState("");
  const [dealStatus, setDealStatus]:any = useState(null);
  
  const [dummyDisclaimers, setDummyDisclaimers] = useState({
    d1: false,
    d2: false,
    d3: false,
  });
  const [disclaimersToggler, setDisclaimersToggler] = useState({
    d1: false,
    d2: false,
    d3: false,
  });
  useEffect(() => {
    dispatch(saveDataHolder(""));
    dispatch(saveUserMetaData(""))
  }, []);
  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllDeals();
  }, [selectedTab]);

  const handleCloseModal = () =>{
    setSelectTypeModal(false)
  }
  const handleDiscModal = () =>{
    setModalOpen("1")
  }
  const getAllDeals = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDeals(authToken,selectedTab,searchQuery);
      if (status === 200) {
        setFilterCounts(data?.status?.data?.stats)
        let deals = data?.status?.data?.deals?.map((deal: any) => {
          return {
            id: deal?.id,
            [language?.v3?.table?.title]: deal?.title || "N/A",
            [language?.v3?.table?.target]: `$${numberFormatter(
              Number(deal?.target)
            )}`,
            [language?.v3?.table?.stage]: deal?.title || "N/A",
            [language?.v3?.table?.round]: deal?.round,
            [language?.v3?.table?.status]: (
              <CustomStatus options={deal?.status} />
            ),
            [language?.v3?.table?.type]: deal?.instrument_type,
            State: deal?.current_state,
            token: deal?.token,
            Steps: deal?.current_state?.steps,
            [language?.v3?.table?.action]: (
              <React.Fragment>
                {(deal?.status === ApplicationStatus.DRAFT ||
                  deal?.status === ApplicationStatus.REOPENED || deal?.status === ApplicationStatus.APPROVED) && (
                    <div
                    onClick={(e) => {
                      if (deal?.status === ApplicationStatus.APPROVED) {
                        setDealId(deal?.id);
                        setDealStatus(deal?.status);
                        setDealStep(deal?.current_state?.current_step);
                        setwarningModal(true);
                      } else {
                        e.preventDefault();
                        e.stopPropagation();
                      
                        dispatch(saveDataHolder(deal.id));
                        if (deal?.status === ApplicationStatus.REOPENED) {
                          navigate(`/create-deal/${deal?.current_state?.current_step + 1}`);
                        } else {
                          navigate(`/create-deal/${deal?.current_state?.current_step + 2}`);
                        }
                      }
                    }}
                    className="bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] p-1 rounded-full transition-all hover:bg-cbc-transparent"
                  >
                    <EditIcon className="w-6 h-6" stroke={"#737373"} />
                  </div>
                )}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(`${RoutesEnums.DEAL_DETAIL}/${deal?.token}`, {
                      state: KanzRoles.STARTUP,
                    });
                  }}
                  className="ml-2 bg-neutral-100 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full transition-all hover:bg-cbc-transparent"
                >
                  <Chevrond
                    className="rotate-[-90deg] w-6 h-6"
                    stroke={"#737373"}
                  />
                </div>
              </React.Fragment>
            ),
          };
        });
        setPagination((prev) => {
          return {
            ...prev,
            total_items: deals.length,
            current_page: 1,
            total_pages: Math.ceil(deals.length / prev.items_per_page),
            data: deals?.slice(0, prev.items_per_page),
          };
        });
        setDeals(deals);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.FUNDRAISER_DASHBOARD });
      }
    } finally {
      setLoading(false);
    }
  };

  const paginate = (type: string) => {
    if (type === "next" && pagination.current_page < pagination.total_pages) {
      setPagination((prev: any) => {
        const nextPage = prev.current_page + 1;
        const startIndex = (nextPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = deals.slice(startIndex, endIndex);
        return { ...prev, current_page: nextPage, data };
      });
    } else if (type === "previous" && pagination.current_page > 1) {
      setPagination((prev: any) => {
        const prevPage = prev.current_page - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = deals.slice(startIndex, endIndex);

        return { ...prev, current_page: prevPage, data };
      });
    } else {
      setPagination((prev: any) => {
        const prevPage = Number(type) + 1 - 1;
        const startIndex = (prevPage - 1) * prev.items_per_page;
        const endIndex = startIndex + prev.items_per_page;
        const data = deals.slice(startIndex, endIndex);

        return { ...prev, current_page: type, data };
      });
    }
  };

  return (
    <main className="h-full max-h-full overflow-y-auto">
      <section>
        <Header />
      </section>
      <aside className="w-full h-full flex items-start justify-start">
        <Sidebar type={KanzRoles.FUNDRAISER} />
        <section
          className="bg-cbc-auth h-full p-[5rem] relative"
          style={{ width: "calc(100% - 250px)" }}
        >
          {loading ? (
            <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>

              <section className="inline-flex justify-between items-center w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-2xl mb-2">
                    {language?.v3?.startup?.overview?.heading}
                  </h1>

                  <span className="w-full flex items-center gap-5">
                  <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden max-w-[310px] inline-flex items-center px-2">
                      <SearchIcon
                        onClick={() => {
                          getAllDeals();
                        }}
                      />
                      <input
                       onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          getAllDeals();
                        }
                      }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search"
                        className="h-full w-full outline-none pl-2 text-sm font-normal "
                        placeholder={language?.v3?.common?.search}
                      />
                    </div>

                    <ul className="inline-flex items-center">
                      {React.Children.toArray(
                        tabs.map((tab:any) => (
                          <li
                            onClick={() => setSelectedTab(tab)}
                            className={`py-2 px-3 font-medium cursor-pointer rounded-md transition-all ${
                              selectedTab === tab
                                ? "text-neutral-900 bg-neutral-100"
                                : "text-gray-500"
                            } `}
                          >
                            {tab} &nbsp;({getCountvalue(tab)})
                          </li>
                        ))
                      )}
                    </ul>
                  </span>
                </div>
                <Button onClick={() => setSelectTypeModal(true)} className="w-[170px]">
                  {language?.v3?.button?.new_deal}
                </Button>
              </section>

              <section className="mt-10">
                <Table
                  columns={columns}
                  pagination={pagination}
                  paginate={paginate}
                  goToPage={paginate}
                 
                  noDataNode={
                    <Button
                      onClick={() => setModalOpen("1")}
                      className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                    >
                      {language?.v3?.button?.new_deal}
                    </Button>
                  }
                />
              </section>
            </React.Fragment>
          )}
        </section>
      </aside>

      <Modal
        show={modalOpen ? true : false}
        className={"w-[700px] screen1024:w-[300px]"}
      >
        {modalOpen === "1" ? (
          <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
            <div className="rounded-md h-8 w-8 inline-grid place-items-center cursor-pointer absolute right-2 top-2">
              <CrossIcon
                stroke="#171717"
                className="w-6 h-6"
                onClick={() => setModalOpen(null)}
              />
            </div>
            <aside>
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.startup?.disc_tit}
              </h2>
              <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-12">
                {language?.v3?.startup?.disc_desc}
              </p>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.startup?.d1}
                  </h2>
                  {disclaimersToggler.d1 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_2,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_3,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.startup?.d_s_arr_1?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_4,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d_s_5,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.startup?.d_s_1?.slice(0, 200) + "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: !prev.d1, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d1: !prev.d1 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d1}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.startup?.d2}
                  </h2>
                  {disclaimersToggler.d2 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_2,
                        }}
                      ></p>
                      {React.Children.toArray(
                        language?.v3?.startup?.d2_arr_1?.map((item: any) => (
                          <p
                            className="font-normal text-neutral-500 text-sm"
                            dangerouslySetInnerHTML={{ __html: item }}
                          ></p>
                        ))
                      )}
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d2_s_3,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.startup?.d2_s_1?.slice(0, 200) +
                            "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: !prev.d2, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d2: !prev.d2 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d2}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="py-3 border-t-[1px] border-neutral-200 inline-flex items-start flex-col w-full cursor-pointer">
                <span>
                  <h2 className="font-medium text-neutral-700 text-xl">
                    {language?.v3?.startup?.d3}
                  </h2>
                  {disclaimersToggler.d3 ? (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d3_s_1,
                        }}
                      ></p>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: language?.v3?.startup?.d3_s_2,
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: false };
                          })
                        }
                      >
                        {language?.v3?.button?.seeLess}
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p
                        className="font-normal text-neutral-500 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            language?.v3?.startup?.d3_s_1?.slice(0, 200) +
                            "...",
                        }}
                      ></p>
                      <button
                        className="cursor-pointer text-sm text-blue-500"
                        onClick={() =>
                          setDisclaimersToggler((prev) => {
                            return { d1: false, d2: false, d3: !prev.d3 };
                          })
                        }
                      >
                        {language?.v3?.button?.seeMore}
                      </button>
                    </React.Fragment>
                  )}
                </span>
                <div
                  className="w-full inline-flex justify-between mt-4 cursor-pointer"
                  onClick={() => {
                    setDummyDisclaimers((prev) => {
                      return { ...prev, d3: !prev.d3 };
                    });
                  }}
                >
                  <p className="font-normal text-neutral-700 text-sm">
                    {language?.v3?.common?.accept}
                  </p>
                  <input
                    type="checkbox"
                    checked={dummyDisclaimers.d3}
                    className="accent-cyan-800 cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full inline-flex items-center justify-center gap-3 mt-10">
                <Button
                  className="w-[100px] bg-transparent border-cyan-800 border-[1px]"
                  type={"outlined"}
                  onClick={() => setModalOpen(null)}
                >
                  {language?.v3?.button?.cancel}
                </Button>
                <Button
                  className="w-[100px]"
                  disabled={
                    !dummyDisclaimers.d1 ||
                    !dummyDisclaimers.d2 ||
                    !dummyDisclaimers.d3
                  }
                  onClick={() => navigate(`${RoutesEnums.CREATE_DEAL}/1`)}
                >
                  {language?.buttons?.continue}
                </Button>
              </div>
            </aside>
          </div>
        ) : (
          <aside>
            <div className="relative p-12 rounded-md shadow-cs-1 flex flex-col items-center w-full bg-white outline-none focus:outline-none screen800:px-3">
              <h2 className="font-bold text-xl text-center text-neutral-900">
                {language?.v3?.common?.submitted_title}
              </h2>
              <p className="text-sm font-normal text-center text-neutral-500 mt-8 mb-7">
                {language?.v3?.common?.submitted_message}
              </p>
              <Button className="w-[100px]" onClick={() => setModalOpen(null)}>
                {language?.v3?.button?.close}
              </Button>
            </div>
          </aside>
        )}
      </Modal>
      <Modal show={selectTypeModal ? true : false} className="w-full">
        <SelectDealTypeModal handleCloseModal={handleCloseModal} handleDiscModal={handleDiscModal}/>
      </Modal>
      <Modal show={warningModal ? true : false} className="w-full">
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
                  Warning!
                </label>
                <p className="pt-5">
                Editing an approved deal will impact its status and would require re-approval. Are you sure you want to proceed with editing?
                </p>
              </div>
            </section>

            <footer className="w-full inline-flex justify-center gap-3 py-2 px-3 ">
            <Button
            type="outlined"
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-6/12"
                onClick={() => {   
               setwarningModal(false)
                }}
              >
             Cancel
              </Button>
              <Button
                className="w-full !py-1"
                divStyle="flex items-center justify-center w-6/12"
                onClick={(e) => {
                      
                  e.preventDefault();
                  e.stopPropagation();
                  
                  dispatch(saveDataHolder(dealId));
                  dealStatus === ApplicationStatus.REOPENED
                    ? navigate(
                        `/create-deal/${
                          dealStep + 1
                        }`
                      )
                    : navigate(
                        `/create-deal/${
                          dealStep + 2
                        }`
                      );
                }}
                
              >
                Continue
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
    </main>
  );
};
export default FundRaiser;
